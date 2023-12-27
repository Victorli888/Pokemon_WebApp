//TODO:  each component must sends the correct text to redux-store before displaying text

import React, {useEffect, useState} from "react";
import './pokeBattleText.css';
import {shallowEqual, useDispatch, useSelector} from "react-redux";
// import {getUserResponse, setContinue, userContinued} from "../redux/actions/pokeBattleActions";
import {setContinue, userContinued} from "../redux/actions/pokeBattleActions";
const PokeBattleText = () => {
    const showGameText = useSelector(state => state.battleState.isGameTextShown, shallowEqual)
    const [currentIndex, setCurrentIndex] = useState(0);
    const textList = useSelector(state => state.battleState.currentTextList, shallowEqual)
    const dispatch = useDispatch();

    // const continueToNext = () => {
    //     if (currentIndex + 1 >= textList.length) {
    //         console.log("Finish reading text list Done!")
    //         dispatch(getUserResponse(currentIndex, textList))
    //     } else {
    //         setCurrentIndex(currentIndex + 1);
    //         console.log(`THIS IS THE TEXT BEING DISPLAYED: ${textList}`)
    //     }
    // };

    const continueToNext = () => {
        if (currentIndex + 1 < textList.length) {
            setCurrentIndex(currentIndex + 1);
            console.log(`THIS IS THE TEXT BEING DISPLAYED: ${textList}`);
        }

        else {
        // Dispatch an action to set isGameTextShown back to false
        dispatch({ type: 'HIDE_TEXT' });
        }

        // Dispatch userContinued at every button click regardless if all text has been read
        dispatch(userContinued())
    };

    useEffect(() => {
        setCurrentIndex(0); // Reset currentIndex when dialogue prop changes

    }, [textList]);

    return (
        <div className={`pokeBattleText-container`} style={{ display: showGameText ? 'block' : 'none' }}>
            <div className={'pokeBattleText'}>
                {showGameText && (
                    <>
                        <p id="display-dialogue" style={{ whiteSpace: 'pre-line'}}>{textList[currentIndex]}</p>
                        <button id={'continue-btn'} onClick={() =>{
                            console.log(`Okay Pressed!  ShowGameText: ${showGameText}`)
                            continueToNext()
                            // dispatch(setContinue(true))
                            dispatch(userContinued())
                        }}>
                            Continue...
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};
export default PokeBattleText