import React, {useEffect, useState} from "react";
import './displayDialogue.css';




const DisplayDialogue = ({dialogue, resetDialogue}) => {
    const [showDialogue, setShowingDialogue] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);



    const continueToNext = () => {
        if (currentIndex + 1 >= dialogue.length) {
            setShowingDialogue(false);
        } else {
            setCurrentIndex(currentIndex + 1);
        }
    };

    useEffect(() => {
        setShowingDialogue(true); // Reset showDialogue when dialogue prop changes
        setCurrentIndex(0); // Reset currentIndex when dialogue prop changes
    }, [dialogue, resetDialogue]);


    return (
            <div className={`dialogue-container`} style={{ display: showDialogue ? 'block' : 'none' }}>
                <div className={'dialogue'}>
                {showDialogue && (
                    <>
                        <p id="display-dialogue" style={{ whiteSpace: 'pre-line'}}>{dialogue[currentIndex]}</p>
                        <button id={'continue-btn'} onClick={() =>{
                            console.log("Okay Pressed!")
                            continueToNext()
                        }}>
                            Continue...
                        </button>
                    </>
                )}
                </div>
            </div>
    );
};
export default DisplayDialogue

