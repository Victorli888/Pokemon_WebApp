import React, { useState } from 'react';

const TalkingCharacter = ({characterImg, id}) => {
    const [isVisible, setIsVisible] = useState(true);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    // if (characterImg == null){
    //     setIsVisible(false)
    // }

    return (
        // <img className={'character-hidden'} src={characterImg} alt="char"/>
        <div id ={id} className={`character`}>
            {characterImg &&(
                <img src={characterImg} alt="Character" />
            )}
        </div>
    );
};

export default TalkingCharacter;
