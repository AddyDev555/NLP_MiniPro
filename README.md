# Automated Grading and Feedback

**Course:** NLP (Semester 6) - Pillai College of Engineering

## Project Overview

This project is part of the Natural Language Processing (NLP) course for Semester 6 students at Pillai College of Engineering.
AutoGrade is an NLP-powered tool designed to classify student essays or assignments into categories based on grading rubrics (e.g., content quality, grammar, relevance). By automating repetitive tasks, it **reduces educators' workload**, **provides faster feedback to students**, and **enhances the grading process** through explainable AI-driven insights.

🔗 You can learn more about the college by visiting the [official website of Pillai College of Engineering](https://www.pce.ac.in).

---

# 🎓 **Acknowledgements**  

We would like to express our sincere gratitude to the following individuals:  

## 📖 **Theory Faculty**  
- **Dhiraj Amin**  
- **Sharvari Govilkar**  

## 🧪 **Lab Faculty**  
- **Dhiraj Amin**  
- **Neha Ashok**  
- **Shubhangi Chavan**  

---

# 📚 AutoGrade: Automated Essay Classification for Educators 🤖

![Banner](./app/public/pic.jpg)

# Project Abstract

The Automated Essay and Assignment Scoring project aims to automatically evaluate and score student essays based on criteria such as content relevance, grammar, structure, and coherence. This task involves applying Machine Learning, Deep Learning, and advanced Language Models to analyze written assignments and generate a grade on a 0–10 scale along with detailed feedback. The project explores various approaches, including traditional regression models using TF-IDF and Word2Vec embeddings, deep learning methods like Bi-LSTM and transformer-based models, as well as state-of-the-art pre-trained language models fine-tuned for essay evaluation. The goal is to compare the performance of each approach and select the best-performing model to achieve objective, consistent, and accurate automated grading.

---

# **Algorithms Used**

## **Machine Learning Algorithms**
- **Linear Regression**
- **Support Vector Regression (SVR)**
- **Gradient Boosting**
  - **XGBoost**
  - **CatBoost**
  - **LightGBM**

## **Deep Learning Algorithms**
- **LSTM**
- **BiLSTM**
- **GRU**

## **Language Models**
- **DeBerta-V3**
- **BERT** (Bidirectional Encoder Representations from Transformers)

---

# Comparative Analysis

The comparative analysis of different models highlights their effectiveness in classifying news articles into the correct category. Below are the summarized performance metrics for various models and configurations.

---

## Comparative Analysis of ML Algorithms

### Base Models

| **Model**             | **Avg. MSE** | **Avg. R²** | **Avg. QWK** |
|-----------------------|--------------|-------------|--------------|
| Linear Regression     | 5.6051       | 0.3687      | 0.5391       |
| SVR                   | 4.0321       | 0.5457      | 0.7116       |
| XGBoost               | 3.8123       | 0.5704      | 0.7216       |
| CatBoost              | 3.8647       | 0.5644      | 0.7267       |
| LightGBM              | 4.0047       | 0.5488      | 0.7144       |

---

### Models with Word2Vec Embedding

| **Model + Word2Vec**          | **Avg. MSE** | **Avg. R²** | **Avg. QWK** |
|-------------------------------|--------------|-------------|--------------|
| Linear Regression + Word2Vec  | 5.7211       | 0.3558      | 0.5387       |
| XGBoost + Word2Vec            | 4.0142       | 0.5476      | 0.6981       |
| CatBoost + Word2Vec           | 4.1685       | 0.5303      | 0.6726       |
| SVR + Word2Vec                | 3.8385       | 0.5677      | 0.7118       |
| LightGBM + Word2Vec           | 3.9207       | 0.5584      | 0.7091       |

---

### Models with TF-IDF Embedding

| **Model + TF-IDF**           | **Avg. MSE** | **Avg. R²** | **Avg. QWK** |
|------------------------------|--------------|-------------|--------------|
| Linear Regression + TF-IDF   | 7.8013       | 0.2012      | 0.6436       |
| XGBoost + TF-IDF             | 2.4433       | 0.7250      | 0.8309       |
| CatBoost + TF-IDF            | 2.5702       | 0.7106      | 0.8189       |
| SVR + TF-IDF                 | 4.1605       | 0.5313      | 0.6906       |
| LightGBM + TF-IDF            | 2.7001       | 0.6961      | 0.8115       |

---

### Models with Feature Engineered Attributes (FE)

| **Model + FE**                 | **Avg. MSE** | **Avg. R²** | **Avg. QWK** |
|--------------------------------|--------------|-------------|--------------|
| Linear Regression + FE         | 5.6051       | 0.3687      | 0.5391       |
| XGBoost + FE                   | 4.0324       | 0.5457      | 0.7116       |
| CatBoost + FE                  | 3.8123       | 0.5704      | 0.7216       |
| SVR + FE                       | 3.8647       | 0.5677      | 0.7267       |
| LightGBM + FE                  | 4.0047       | 0.5488      | 0.7144       |

---

### Models with Word2Vec Embedding and FE

| **Model + Word2Vec + FE**       | **Avg. MSE** | **Avg. R²** | **Avg. QWK** |
|---------------------------------|--------------|-------------|--------------|
| Linear Regression + Word2Vec + FE| 4.4133       | 0.5036      | 0.6734       |
| XGBoost + Word2Vec + FE         | 2.4867       | 0.7200      | 0.8346       |
| CatBoost + Word2Vec + FE        | 2.4846       | 0.7204      | 0.8325       |
| SVR + Word2Vec + FE             | 2.8552       | 0.6783      | 0.7977       |
| LightGBM + Word2Vec + FE        | 2.3491       | 0.7355      | 0.8433       |

---

### Models with TF-IDF Embedding and FE

| **Model + TF-IDF + FE**         | **Avg. MSE** | **Avg. R²** | **Avg. QWK** |
|---------------------------------|--------------|-------------|--------------|
| Linear Regression + TF-IDF + FE | 5.4707       | 0.3833      | 0.6860       |
| XGBoost + TF-IDF + FE           | 2.4257       | 0.7270      | 0.8351       |
| CatBoost + TF-IDF + FE          | 2.5741       | 0.7100      | 0.8195       |
| SVR + TF-IDF + FE               | 5.0034       | 0.4367      | 0.5620       |
| LightGBM + TF-IDF + FE          | 2.3491       | 0.7355      | 0.8433       |

---

## Comparative Analysis of DL Algorithms

### DL Models with Word2Vec Embedding

| **Model + Word2Vec**        | **Cross-Validation** | **Avg. R²** | **Avg. QWK** |
|-----------------------------|----------------------|-------------|--------------|
| LSTM + Word2Vec             | 1.9960               | 0.6770      | 0.7883       |
| BiLSTM + Word2Vec           | 1.5400               | 0.7700      | 0.8000       |
| GRU + Word2Vec              | 2.1950               | 0.6300      | 0.7550       |

---

### DL Models with TF-IDF Embedding

| **Model + TF-IDF**          | **Cross-Validation** | **Avg. R²** | **Avg. QWK** |
|-----------------------------|----------------------|-------------|--------------|
| LSTM + TF-IDF               | 2.3460               | 0.4200      | 0.6250       |
| BiLSTM + TF-IDF             | 2.9250               | 0.4000      | 0.6240       |
| GRU + TF-IDF                | 3.0800               | 0.3700      | 0.5700       |

---

## Comparative Analysis of Language Models

| **Language Model** | **Validation Loss** | **Avg. R²** | **Avg. QWK** |
|--------------------|---------------------|-------------|--------------|
| DEBerta-V3         | 2.0681              | 0.7812      | 0.8768       |
| BERT               | 0.1220              | 0.9868      | 0.9935       |

---

## 🚀 Key Features
- **Automated Essay Classification**: Leverage ML/DL models to categorize essays efficiently.
- **Multi-Dimensional Evaluation**: Assess essays across rubrics like content, grammar, and relevance.
- **Model Comparisons**: Choose from 20+ models (traditional ML, deep learning, and transformers).
- **Open-Source & Customizable**: Adapt the pipeline to your institution's unique rubrics.
- **Explainable Results**: Generate feedback reports for students and educators.

---

## 📊 Model Performance Summary

### 🏆 Top Performers
| Model               | R² Score | QWK Score |
|---------------------|----------|-----------|
| **BERT**            | 0.9868   | 0.9935    |
| **DeBERTa-V3**      | 0.7812   | 0.8767    |
| **BiLSTM+Word2Vec** | 0.77     | 0.8       |

### 🔍 Full Model Comparison
#### **Language Models (Best Overall)**
| Model          | R² Score | QWK Score |
|----------------|----------|-----------|
| BERT           | 0.9868   | 0.9935    |
| DeBERTa-V3     | 0.7812   | 0.8767    |

#### **Deep Learning Models**
| Model               | R² Score | QWK Score |
|---------------------|----------|-----------|
| BiLSTM + Word2Vec   | 0.77     | 0.8       |
| LSTM + Word2Vec     | 0.67     | 0.788     |

#### **Machine Learning Models**
| Model                          | R² Score | QWK Score |
|--------------------------------|----------|-----------|
| LightGBM + TF-IDF + FE         | 0.7367   | 0.8451    |
| XGBoost + TF-IDF + FE          | 0.727    | 0.8351    |

---

# Conclusion

This Automated Essay and Assignment Scoring project demonstrates the effectiveness of using Machine Learning, Deep Learning, and Language Models for automated grading tasks. By integrating traditional regression techniques with advanced deep learning and transformer-based models, the system is able to assess essays on various dimensions such as content relevance, grammar, structure, and coherence.

The comparative analysis reveals that while baseline models like Linear Regression offer simplicity and interpretability, advanced models such as SVR, gradient boosting techniques, and deep learning architectures (e.g., BiLSTM and transformer-based models) provide significant improvements in predictive accuracy and reliability. Notably, pre-trained language models such as BERT and DeBERTa excel at capturing deep semantic relationships in the text, resulting in more precise and consistent grading.

Overall, this project offers valuable insights into the strengths and weaknesses of different approaches, paving the way for further enhancements. Future work may focus on real-time feedback integration, further refinement of model ensembles, and adaptation for multilingual and diverse academic contexts.

---

## ⚙️ Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/AddyDev555/NLP_MiniPro.git
   cd NLP_MiniPro
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Download pretrained models (optional):
   ```bash
   python download_models.py
   ```

## 🛠️ Usage
1. **Preprocess Essays**:
   ```python
   def preprocess_text(text):
       sequences = tokenizer.texts_to_sequences([text])
       padded_sequence = pad_sequences(sequences, maxlen=MAX_SEQUENCE_LENGTH, padding='post', truncating='post')
       return padded_sequence
   ```

2. **Evaluate with BiLSTM Model**:
   ```python
   model = load_model("essay_scoring_model_bilstm.h5")
   def predict_score(text):
       processed_text = preprocess_text(text)
       prediction = model.predict(processed_text)
       predicted_score = np.round(prediction).flatten()[0]
       return predicted_score
   ```

3. **Generate Feedback and Suggestion Report**:
   ```python
   grader.generate_report(score, suggestion=setSuggestion())
   ```

## 📈 Results & Insights
* **BERT dominates** with near-perfect QWK (0.9935), suggesting exceptional agreement with human graders.
* **BiLSTM + Word2Vec** outperforms other DL models (R²=0.77).
* **TF-IDF + LightGBM** is the best non-transformer option (QWK=0.8451).

## 🤝 Contributing
We welcome contributions! Please:
1. Fork the repository.
2. Open an issue to discuss proposed changes.
3. Submit a pull request with tests.

## 🙏 Acknowledgments
* Hugging Face for `BERT` and `DeBERTa` implementations.
* Kaggle community for essay datasets.
* Educators worldwide for inspiring this tool!
