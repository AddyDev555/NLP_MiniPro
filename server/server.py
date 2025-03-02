from flask import Flask, jsonify, request, json
from main import predict_score
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/result', methods=['POST'])
def resultPage():
    essay = request.get_json()
    score = predict_score(essay)
    if score >= 5.0 and score <=10.0:
        score = 6.0
    elif score >= 11.0 and score <= 15.0:
        score = 7.0
    elif score >= 16 and score <= 30.0:
        score = 8.0
    elif score >= 31 and score <= 45.0:
        score = 9.0
    elif score >= 46 and score <= 60.0:
        score = 10.0
    float_score = float(score)
    json_str = json.dumps(float_score)
    return jsonify({"essayScore": json_str})

if __name__ == '__main__':
    app.run(debug=True)