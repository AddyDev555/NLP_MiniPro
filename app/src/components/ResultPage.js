import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { GoogleGenerativeAI } from '@google/generative-ai';
import "./css/Result.css";

async function fileToGenerativePart(file) {
    const base64EncodedDataPromise = new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]);
        reader.readAsDataURL(file);
    });

    return {
        inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
}

export default function ResultPage() {
    const location = useLocation();
    const { image, type } = location.state || {};
    const [ansText, setAnsText] = useState("");
    const [loading, setLoading] = useState(false);
    const [score, setScore] = useState(null);
    const [suggestion, setSuggestion] = useState(null);
    const [emojiClass, setEmojiClass] = useState("fi-rr-neutral");

    useEffect(() => {
        const fetchData = async () => {
            if (!image) {
                console.error("No image provided");
                return;
            }

            setLoading(true);

            try {
                const imagePart = await fileToGenerativePart(image);
                const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);
                const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

                const prompt = "Extract only the text from the provided image file.";
                const result = await model.generateContent({
                    contents: [{ parts: [{ text: prompt }, imagePart] }]
                });

                const extractedText = result.response.text();
                setAnsText(extractedText);
            } catch (err) {
                console.error("Error extracting text:", err.message);
                setAnsText("Error: " + err.message);
            } finally {
                setLoading(false);
            }
        };

        if (image) fetchData();
    }, [image]);

    useEffect(() => {
        if (!ansText || ansText.startsWith("Error")) return;

        const fetchScore = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/result', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(ansText),
                });

                const data = await response.json();
                setScore(data.essayScore);
                setEmojiClass(data.essayScore > 5.0 ? "fi-rr-smile-beam" : "fi-rr-sad");
            } catch (error) {
                console.error('Error fetching score:', error);
            }
        };

        const provideSuggestion = async () => {
            try {
                const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);
                const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

                const prompt = `provide a very short suggestion on the provided ${type} on basis of grammar and other aspects.`;
                const result = await model.generateContent({
                    contents: [{ parts: [{ text: prompt }, { text: ansText }] }]
                });

                setSuggestion(result.response.text());
            } catch (err) {
                console.error("Error classifying text:", err.message);
            }
        };

        provideSuggestion();
        fetchScore();
    }, [ansText, type]);

    return (
        <main>
            {loading ? <div className="loader"></div> :
                <div className="textTract">
                    <div className="title">
                        <img src="./text.png" alt="textLogo" />
                        <h1>Extracted Text from Answer-Sheet</h1>
                    </div>
                    <div className="extractedText">
                        {ansText}
                    </div>
                    <div className="scoreCon">
                        <div className="scoreTitle">
                            <img src="./score.png" alt="score_img" />
                            <h1>Final Score for {type} (0-10)</h1>
                        </div>
                        <div className="suggestion">
                            <p>{type} Score: {score} <i className={`fi ${emojiClass} emoji`}></i></p>
                            <h1>Suggestions on your {type}</h1>
                            <p className="suggestionCon">{suggestion}</p>
                        </div>
                    </div>
                </div>
            }
        </main>
    );
}
