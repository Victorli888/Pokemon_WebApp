import React, { useState } from 'react';
import imagePaths from "./imagePaths";
import AboutDetails from './aboutDetails';
import "./NavBar.css";

function Navbar() {
    const [appDetailsVisible, setAppDetailsVisible] = useState(false);

    function toggleAppDetails() {
        setAppDetailsVisible(!appDetailsVisible);
        console.log("AppDetails have been toggled")
    }

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <img id='poke-logo' src={imagePaths.pokeLogo} alt='logo' />
            </div>
            <div>
                <a href="https://github.com/Victorli888/Pokemon_WebApp">
                    <img id='git-logo' src={imagePaths.githubLogo} alt="Github icon" />
                </a>
                <img onClick={toggleAppDetails} id='about-logo' src={imagePaths.aboutIcon} alt="About icon" />
            </div>
            {appDetailsVisible && <AboutDetails isVisible={appDetailsVisible}/>}
        </nav>
    );
}
export default Navbar;
