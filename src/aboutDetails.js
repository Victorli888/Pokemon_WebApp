import imagePaths from "./imagePaths";
import React, { useState } from "react";
import './aboutDetails.css'

function AboutDetails({isVisible}) {

    return (
        <div>
            <div className={isVisible ? "about-details": ""}>
                <h1> About The Game </h1>
                <p>
                    Embark on a nostalgic visual novel style adventure reminiscent of a cherished childhood classic. Immerse yourself in
                    a captivating journey shaped by your decisions. Choose your path, make meaningful choices, and experience the
                    excitement of a dynamic storyline.
                </p>
                <p>
                    You'll encounter a world filled with iconic characters, challenging puzzles, and captivating
                    narratives. Engage in exciting battles, capture Pokemon, and unravel mysteries as you progress
                    through the game.
                </p>
                <p>
                    Features:
                </p>
                <ul>
                    <li> <b>Engaging HTML/CSS Foundation:</b> This web application boasts a visually appealing interface that sets the stage for an immersive user experience. </li>
                    <li><b>Dynamic Interactivity with JavaScript & React:</b> Leveraging the power of JavaScript and React, the application features seamless interactivity, ensuring a smooth and responsive user interface.</li>
                    <li><b>Catch & Battle Pokemon:</b> Dive into thrilling Pokemon battles, where strategy and skill determine victory. Experience dynamic animations and encounter wild Pokemon, and master the art of capturing them. </li>
                    <li><b>Visual Novel-Style Adventure:</b> Immerse users in a captivating visual novel-style adventure. The story is woven with rich narratives, offering players a unique and interactive storytelling experience.</li>
                    <li><b>Selectable Dialogue Responses:</b> Shape the narrative with selectable dialogue responses. Your choices impact the storyline, providing a personalized and interactive storytelling experience.</li>
                    <li><b>Customizable Pokemon Teams:</b> Build and customize your Pokemon team with a variety of creatures. Train them, level them up, and strategize for epic battles.</li>
                    <li><b>Explorable Pokemon World:</b> Immerse yourself in a vast and visually stunning Pokemon world. Explore different spots, discover hidden areas, and discover all sorts of Pokemon </li>
                </ul>
            </div>
        </div>
    );
}

export default AboutDetails;
