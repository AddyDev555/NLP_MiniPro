import sys
import torch
from typing import List
from sentence_transformers import SentenceTransformer, util
from transformers import AutoTokenizer, AutoModelForSequenceClassification

###############################################################################
# Configuration
###############################################################################

# Sentence-BERT model for similarity
EMBEDDING_MODEL_NAME = "all-MiniLM-L6-v2"

# RoBERTa MNLI model for contradiction detection
# (Remember label mapping for roberta-large-mnli -> 0=CONTRADICTION,1=NEUTRAL,2=ENTAILMENT)
NLI_MODEL_NAME = "roberta-large-mnli"

# Word count thresholds
MIN_WORD_COUNT = 50
MAX_WORD_COUNT = 400

###############################################################################
# Load Models
###############################################################################

print("Python version:", sys.version)
print("Torch version:", torch._version_)

print(f"\nLoading Sentence-BERT embedding model: {EMBEDDING_MODEL_NAME}")
embedding_model = SentenceTransformer(EMBEDDING_MODEL_NAME)

print(f"Loading NLI model for contradiction detection: {NLI_MODEL_NAME}\n")
nli_tokenizer = AutoTokenizer.from_pretrained(NLI_MODEL_NAME)
nli_model = AutoModelForSequenceClassification.from_pretrained(NLI_MODEL_NAME)

###############################################################################
# Core Functions
###############################################################################

def compute_similarity(text_a: str, text_b: str) -> float:
    """
    Compute semantic similarity between two strings using Sentence-BERT embeddings.
    Returns a float in [0.0, 1.0].
    """
    emb_a = embedding_model.encode(text_a, convert_to_tensor=True)
    emb_b = embedding_model.encode(text_b, convert_to_tensor=True)
    sim = util.cos_sim(emb_a, emb_b).item()  # Cosine similarity
    return sim

def compute_contradiction_prob(premise: str, hypothesis: str) -> float:
    """
    Use RoBERTa MNLI to get the probability that 'hypothesis' CONTRADICTS 'premise'.
    roberta-large-mnli label mapping:
        0 -> CONTRADICTION
        1 -> NEUTRAL
        2 -> ENTAILMENT
    Returns a float in [0.0, 1.0].
    """
    inputs = nli_tokenizer.encode_plus(
        premise, hypothesis,
        return_tensors='pt',
        truncation=True
    )
    with torch.no_grad():
        logits = nli_model(**inputs).logits
    
    probs = torch.softmax(logits, dim=1)[0]  # shape: [3]
    contradiction_prob = probs[0].item()  # index 0 is CONTRADICTION
    return contradiction_prob

def score_reference_point(reference_point: str, student_text: str) -> float:
    """
    Combines similarity and contradiction detection to yield a final score
    for a single reference point vs. the student's entire answer.
    
    Formula: final = similarity * (1 - contradiction_prob).
    We also check contradiction in both directions and take the max contradiction
    probability to be safe.
    """
    sim = compute_similarity(reference_point, student_text)
    
    contr_prob_1 = compute_contradiction_prob(reference_point, student_text)
    contr_prob_2 = compute_contradiction_prob(student_text, reference_point)
    contr_prob = max(contr_prob_1, contr_prob_2)
    
    final_score = sim * (1 - contr_prob)
    return final_score

def score_word_count(student_text: str, min_count=MIN_WORD_COUNT, max_count=MAX_WORD_COUNT) -> float:
    """
    Evaluate the student's word count. If it's within the ideal range, return 1.0.
    If it's below or above, penalize accordingly. This is a simple approach—adjust as needed.
    """
    words = student_text.split()
    wc = len(words)
    
    if wc < min_count:
        # scale from 0 to 1 as wc goes from 0 to min_count
        return wc / float(min_count)
    elif wc > max_count:
        # If > max_count, linearly penalize until 2*max_count => 0
        if wc >= 2 * max_count:
            return 0.0
        else:
            return 1.0 - (wc - max_count) / float(max_count)
    else:
        return 1.0

def evaluate_answer(
    question: str,
    reference_points: List[str],
    student_answer: str,
    word_count_weight=0.2,
    points_weight=0.8
) -> float:
    """
    Evaluate a long paragraph-based student answer against:
      - a list of reference bullet points
      - word count constraints
      - contradiction detection + similarity
    
    Returns a final score in [0, 1].
    """
    # Word count score
    wc_score = score_word_count(student_answer)
    
    # Evaluate each reference bullet point
    point_scores = []
    for rp in reference_points:
        rp_score = score_reference_point(rp, student_answer)
        point_scores.append(rp_score)
    
    avg_points_score = sum(point_scores) / len(point_scores) if point_scores else 0.0
    
    # Combine using weighting
    final_score = (word_count_weight * wc_score) + (points_weight * avg_points_score)
    return final_score

###############################################################################
# Main / Examples
###############################################################################
if __name__ == "__main__":
    # Common question + reference points
    question = "Explain the importance of resource planning in India."
    reference_points = [
        "Definition of resource planning",
        "Why resources are unevenly distributed in India",
        "How planning ensures sustainability and prevents overuse"
    ]
    
    # 1) GOOD EXAMPLE - covers all points, appropriate length, no contradiction
    good_example = {
        "question": question,
        "reference_points": reference_points,
        "student_answer": (
            "Resource planning refers to a systematic strategy for using resources "
            "in a balanced way. In India, resources are not evenly spread—some regions "
            "have abundant minerals while others lack them. By planning, we ensure that "
            "we do not exploit resources too quickly. This helps preserve them for future "
            "generations, prevents ecological damage, and maintains sustainability. "
            "Moreover, resource planning tackles unequal distribution by allocating resources "
            "where they're needed most."
        )
    }
    
    # 2) BAD EXAMPLE - short, missing or contradicting points, poor coverage
    bad_example = {
        "question": question,
        "reference_points": reference_points,
        "student_answer": (
            "Resource planning is not necessary because resources are found everywhere in India, "
            "so there's no need to worry about running out. Also, it's too complicated "
            "to plan resources for the future."
        )
    }
    
    # Evaluate Good Example
    good_score = evaluate_answer(
        good_example["question"],
        good_example["reference_points"],
        good_example["student_answer"],
        word_count_weight=0.2,
        points_weight=0.8
    )
    
    # Evaluate Bad Example
    bad_score = evaluate_answer(
        bad_example["question"],
        bad_example["reference_points"],
        bad_example["student_answer"],
        word_count_weight=0.2,
        points_weight=0.8
    )
    
    # Print Results
    print("=======================================")
    print("           GOOD EXAMPLE")
    print("=======================================")
    print(f"Question: {good_example['question']}")
    print("Reference Points:", reference_points)
    print(f"Student Answer:\n{good_example['student_answer']}\n")
    print(f"Final Score (0 to 1): {good_score:.4f}")
    
    print("\n=======================================")
    print("           BAD EXAMPLE")
    print("=======================================")
    print(f"Question: {bad_example['question']}")
    print("Reference Points:", reference_points)
    print(f"Student Answer:\n{bad_example['student_answer']}\n")
    print(f"Final Score (0 to 1): {bad_score:.4f}")