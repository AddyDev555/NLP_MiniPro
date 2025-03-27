"use client"
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
    const [suggestion, setSuggestion] = useState([]);
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
                const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY)
                const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" })

                const prompt = `Analyze the following ${type} and provide 3-5 specific improvement suggestions.
                    For each suggestion:
                1. Focus on a specific aspect (Grammar, Structure, Vocabulary, etc.)
                2. Be concise but specific
                3. Format your response as a numbered list with each point on a new line
                4. Start each point with "**Category:** " (e.g., "**Grammar:** Fix subject-verb agreement") Here the category is grammar`

                const result = await model.generateContent({
                    contents: [{ parts: [{ text: prompt }, { text: ansText }] }],
                })

                const responseText = result.response.text()

                const suggestionsList = responseText
                    .split(/\d+\.\s+/) 
                    .filter((item) => item.trim().length > 0) 
                    .map((item) => {
                        const match = item.match(/\*\*(.*?):\*\*(.*)/)
                        if (match) {
                            return {
                                category: match[1].trim(),
                                content: match[2].trim(),
                            }
                        }
                        return {
                            category: "Improvement",
                            content: item.trim(),
                        }
                    })

                setSuggestion(suggestionsList)
            } catch (err) {
                console.error("Error getting suggestions:", err.message)
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

                {suggestion.length > 0 ? (
                    <ul className="suggestions-list">
                    {suggestion.map((item, index) => (
                        <li key={index} className="suggestion-item">
                        <span className="suggestion-category">{item.category}</span>
                        <span className="suggestion-content">{item.content}</span>
                        </li>
                    ))}
                    </ul>
                ) : (
                    <p className="suggestionCon">Loading suggestions...</p>
                )}
                        </div>
                    </div>
                </div>
            }
        </main>
    );
}
