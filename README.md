# 📚 AutoGrade: Automated Essay Classification for Educators 🤖

![Banner](./app/public/pic.jpg)

AutoGrade is an NLP-powered tool designed to classify student essays or assignments into categories based on grading rubrics (e.g., content quality, grammar, relevance). By automating repetitive tasks, it **reduces educators' workload**, **provides faster feedback to students**, and **enhances the grading process** through explainable AI-driven insights.

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
