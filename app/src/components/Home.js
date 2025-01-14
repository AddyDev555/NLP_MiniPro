import React from 'react'
import "./css/Home.css";

export default function Home() {
    return (
        <div className='mainCon'>
            <div className="form">
                <label htmlFor="ansSheetImage">Upload Answer Sheet</label>
                <input type="file" id="ansSheetImage"/>
                <br />
                <button>Submit</button>
            </div>
        </div>
    )
}
