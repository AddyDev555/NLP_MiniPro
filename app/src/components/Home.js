import React from 'react'
import "./css/Home.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            navigate('/result', { state: { image: file } });
        } else {
            console.log("No file selected");
        }
    };

    return (
        <div className='mainCon'>
            <div className="form">
                <h1><img src="./logo.png" alt="logo" />Auto<span>Grade</span></h1>
                <p>Streamlined Grading, Smarter Learning.</p>
                <label htmlFor="ansSheetImage">Upload Answer Sheet</label>
                <input type="file" id="ansSheetImage" accept=".jpeg, .jpg, .png" onChange={handleFileChange} />
            </div>
        </div>
    )
}
