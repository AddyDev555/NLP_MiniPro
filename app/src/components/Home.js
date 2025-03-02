import React, {useState} from 'react'
import "./css/Home.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    const [selectedType, setSelectedType] = useState("Essay");

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            navigate('/result', { state: { image: file , type: selectedType} });
        } else {
            console.log("No file selected");
        }
    };

    const handleToggle = (event) => {
        setSelectedType(event.target.checked ? "Assignment" : "Essay");
    };

    return (
        <div className='mainCon'>
            <div className="switchCon">
                <label for="filter" class="switch" aria-label="Toggle Filter">
                    <input type="checkbox" id="filter" onChange={handleToggle}/>
                    <span>Essay</span>
                    <span>Assignment</span>
                </label>
            </div>
            <div className="form">
                <h1><img src="./logo.png" alt="logo" />Auto<span>Grade</span></h1>
                <p>Streamlined Grading, Smarter Learning.</p>
                <label htmlFor="ansSheetImage">Upload Answer Sheet</label>
                <input type="file" id="ansSheetImage" accept=".jpeg, .jpg, .png" onChange={handleFileChange} />
            </div>
        </div>
    )
}
