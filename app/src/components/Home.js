import React from 'react'
import "./css/Home.css";

export default function Home() {
    return (
        <div className='mainCon'>
            <div className="form">
                <h1><img src="./logo.png" alt="logo" />Auto<span>Grade</span></h1>
                <p>Streamlined Grading, Smarter Learning.</p>
                <label htmlFor="ansSheetImage">Upload Answer Sheet</label>
                <input type="file" id="ansSheetImage"/>
                <br />
                <button>Submit</button>
            </div>
        </div>
    )
}
