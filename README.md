# 📚 AutoGrade: Automated Essay Classification for Educators 🤖

![Banner](https://placehold.co/1200x400/4B86B4/FFFFFF?text=AutoGrade%20-%20Automated%20Essay%20Grading%20with%20AI)

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
   from utils import preprocess_essay
   essay = "Student's essay text here..."
   processed_essay = preprocess_essay(essay)
   ```

2. **Evaluate with BERT**:
   ```python
   from models import BertGrader
   grader = BertGrader()
   scores = grader.evaluate(processed_essay)
   ```

3. **Generate Feedback Report**:
   ```python
   grader.generate_report(scores, output_path="feedback.pdf")
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

## 📜 License
This project is licensed under the MIT License. See LICENSE.

## 🙏 Acknowledgments
* Hugging Face for `BERT` and `DeBERTa` implementations.
* Kaggle community for essay datasets.
* Educators worldwide for inspiring this tool!
