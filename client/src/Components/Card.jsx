import React from "react";
import "../css/Card.css";

export default function Card({ Image, title, diets, id }) {

    return (
        <div key={id.toString()} className="card">
            <img className="image" src={Image} alt="" />
            <div className="innerContainer">
                <h3 className="Title">{title}</h3>
                <div className="contained_diets">
                    <>{diets}</>
                </div>
            </div>
        </div>
    )
}