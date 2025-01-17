import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { GoogleGenerativeAI } from '@google/generative-ai';
import "./css/Result.css";

// Helper function to convert file to the required format
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
    const { image } = location.state || {};
    const [ansText, setAnsText] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!image) {
                console.error("No image provided");
                return;
            }

            setLoading(true);

            try {
                // Convert image to GenerativeAI format
                const imagePart = await fileToGenerativePart(image);

                // Initialize GoogleGenerativeAI with your API key
                const genAI = new GoogleGenerativeAI("AIzaSyAqCDh7MQaIWBZeW0pnMxSIK8X4NvMRRT4");
                const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

                // Define the prompt for AI content
                const prompt = "Extract only the Text from the provided Image file";

                // Request AI response
                const result = await model.generateContent({
                    contents: [
                        { parts: [{ text: prompt }, imagePart] }
                    ]
                });

                setAnsText(result.response.text());
            } catch (err) {
                console.error("Error fetching AI content:", err.message);
                setAnsText("Error: " + err.message);
            } finally {
                setLoading(false);
            }
        };

        if (image) {
            fetchData();
        }
    }, [image]);

    return (
        <main>
            {loading ? <div class="loader"></div> :
            <div className="textTract">
                <div className="title">
                    <img src="./text.png" alt="textLogo" />
                    <h1>Extracted Text from Answer-Sheet</h1>
                </div>
                <div className="extractedText">
                    {ansText}
                </div>
            </div>
            }
        </main>
    );
}
