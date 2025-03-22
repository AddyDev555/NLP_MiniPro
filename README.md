# 📚 AutoGrade : Automated Essay Classification for Educators 🤖

![Banner](https://placehold.co/1200x400/4B86B4/FFFFFF?text=AutoGrade%20-%20Automated%20Essay%20Grading%20with%20AI)

AutoGrade is an NLP-powered tool designed to classify student essays or assignments into categories based on grading rubrics (e.g., content quality, grammar, relevance). By automating repetitive tasks, it **reduces educators' workload**, **provides faster feedback to students**, and **enhances the grading process** through explainable AI-driven insights.

---

## 🚀 Key Features
- **Automated Essay Classification**: Leverage ML/DL models to categorize essays efficiently.
- **Multi-Dimensional Evaluation**: Assess essays across rubrics like content, grammar, and relevance.
- **Model Comparisons**: Choose from 20+ models (traditional ML, deep learning, and transformers).
- **Open-Source & Customizable**: Adapt the pipeline to your institution’s unique rubrics.
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
   git clone https://github.com/yourusername/edugrader.git
   cd edugrader
