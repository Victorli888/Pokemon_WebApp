import React, { useState, useEffect } from 'react';
import {
    attemptEscape,
    performBagAction,
    performPokemonSwap,
    startFightMove,
    startPokeBattleRound,

} from "./pokeBattleLogic";
import './pokeBattle.css';
import './index.css';
import {gameTexts} from "./gameTexts";

const PokemonBattle = ({playerPokemonTeam, opponentPokemonTeam, stageType, isTrainerBattle }) => {

    const [playerPokemon, setPlayerPokemon] = useState(playerPokemonTeam[0]);
    const [opponentPokemon, setOpponentPokemon] = useState(opponentPokemonTeam[0]);
    const [playerPokemonData, setPlayerPokemonData] = useState(null);
    const [opponentPokemonData, setOpponentPokemonData] = useState(null);
    const [isShowingDetailsBox, setIsShowingDetailsBox] = useState(true);
    const [isShowingPokeBattleOptions, setIsShowingPokeBattleOptions] = useState(true);
    const [isShowingFightOptions, setIsShowingFightOptions] = useState(false);
    const [isShowingBagOptions, setIsShowingBagOptions] = useState(false);
    let [isBattleState, setIsBattleState] = useState(true);
    const [showGameText, setShowGameText] = useState(null);
    let [isGameOverState, setIsGameOverState] = useState(false);
    let [isRoundDone, setIsRoundDone] = useState(true);
    let [continuePressed, setContinuePressed] = useState(false);


    // Call this function when you want to hide the battle options and buttons.
    const hidePokeBattleOptions = () => {
        setIsShowingPokeBattleOptions(false);
    };

// Call this function when you want to show the battle options and buttons again.
    const showPokeBattleOptions = () => {
        setIsShowingPokeBattleOptions(true);
    };

// Call this function when the Pokémon is making an attack to hide the battle details.
    const hideDetailsBox = () => {
        setIsShowingDetailsBox(false);
    };

// Call this function when you want to show the battle details again.
    const showDetailsBox = () => {
        setIsShowingDetailsBox(true);
    };

    const showFightOptions = () => {
        setIsShowingFightOptions(true)
    }

    const hideFightOptions = () => {
        setIsShowingFightOptions(false)
    }

    function displayText(text) {
        return (
            <div>
                <p id={'display-text'}>{text}</p>
            </div>
        );
    }

    function refreshPage() {
        window.location.reload();
    }


    function updateDetails(playerPokemon, opponentPokemon){
        setPlayerPokemon(playerPokemon)
        setOpponentPokemon(opponentPokemon)

        console.log("updating Details & completing round")
        hidePokeBattleOptions()
        hideFightOptions()
        showDetailsBox()
    };

    function updateSinglePokemon(pokemon, trainer){
        if (trainer === 'player'){
            setPlayerPokemon(pokemon)
        }
        else if (trainer === 'opponent'){
            setOpponentPokemon(pokemon)
        }
        else{
            throw new Error("player or opponent string not set");
        }
    }

    function checkForWinner(){
        if(playerPokemon && playerPokemon.willWhiteOut){
            console.log("GAME OVER")
            setIsBattleState(false)
            console.log(`BattleState Now set to ${isBattleState}`)
            setShowGameText(gameTexts.playerDefeated)
            setIsGameOverState(true);
            console.log(`isGameOverState: ${isGameOverState}`)

        }
        else if(opponentPokemon && opponentPokemon.willWhiteOut){
            console.log("YOU WIN!")
            console.log(`WHITE OUT VALUE: ${opponentPokemon.willWhiteOut}`)
            setIsBattleState(false)
            console.log(`BattleState Now set to ${isBattleState}`)
            setShowGameText(gameTexts.opponentDefeated)
        }

        else{
            console.log("Battle Continues...")

        }

    }

    useEffect(() => {
        if (isBattleState) {
            // Fetch player's Pokémon data from the API
            console.log(`fetching ${playerPokemon.name}`)
            fetchPokemonData(playerPokemon.name, setPlayerPokemonData);

            // Fetch opponent's Pokémon data from the API
            console.log(`attempt fetch ${opponentPokemon.name}`)
            fetchPokemonData(opponentPokemon.name, setOpponentPokemonData);
        }
    }, [isBattleState, opponentPokemon, playerPokemon]);

    useEffect(() => {
        if(continuePressed) { // only if the flag is true
            setShowGameText(null)
            if (isGameOverState) {
                console.log("refreshing page")
                refreshPage()
            }
            // else if (isRoundDone) {
            //     showPokeBattleOptions()
            //     showDetailsBox()
            // }
            else if (!isBattleState){
                console.log("battle Ended continue on with story")
                hideDetailsBox()
            }
            else {
                console.log("showing Options")
                showPokeBattleOptions()
                hideFightOptions()

            }

            setContinuePressed(false); // reset the flag for next round
        }
    }, [continuePressed]); // add continuePressed in the dependency array

    // useEffect(() => {
    //     if (continuePressed) {
    //         // Call your function that should run when 'continue' is clicked.
    //         displayBetterGameText(playerPokemon, opponentPokemon, turnOrder.shift());
    //         // Reset 'continuePressed' for next sequence.
    //         setContinuePressed(false);
    //     }
    // }, [continuePressed]);

    const fetchPokemonData = (pokemonName, setData) => {
        console.log(` attempting to fetch data for ${pokemonName}`)
        // Construct the URL to fetch Pokémon data by name
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;
        console.log(`Data Fetched at ${url}`)

        // Fetch Pokémon data
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                // Now data contains the entire Pokémon payload in JSON format
                setData(data);
                console.log(`setting Data for ${pokemonName} was successful`)
            })
            .catch((error) => {
                console.error(`Error fetching ${pokemonName}'s data:`, error);
            });
    };

    async function displayGameText(playerPokemon, opponentPokemon, turnOrder){
        let gameText = '';
        let turnCounter = 0;

        console.log(`This is the turn order ${turnOrder[0].actor} then ${turnOrder[1].actor}`);

        for(let action of turnOrder){
            if(action.actor === "player"){
                gameText += `${playerPokemon.name} used ${playerPokemon.moves[0]}\n`;
                turnCounter++;
            }
            else if(action.actor === "opponent"){
                gameText += `${opponentPokemon.name} used ${opponentPokemon.moves[0]}\n`;
                turnCounter++;
            }
        }

        setShowGameText(gameText);
        console.log(`counted ${turnCounter} turns`);
    }

    // async function displayBetterGameText(playerPokemon, opponentPokemon, turnOrder){
    //     let gameText = '';
    //     setIsRoundDone(false)
    //
    //
    //     console.log(`${turnOrder[0].actor} is going now`);
    //
    //
    //     if(turnOrder[0].actor === "player"){
    //         gameText += `${playerPokemon.name} used ${playerPokemon.moves[0]}\n`;
    //         setShowGameText(gameText);
    //         updateSinglePokemon(playerPokemon, 'player')
    //         await displayBetterGameText(playerPokemon, opponentPokemon, turnOrder.shift)
    //
    //     }
    //     else if(turnOrder[0].actor === "opponent"){
    //         gameText += `${opponentPokemon.name} used ${opponentPokemon.moves[0]}\n`;
    //         setShowGameText(gameText);
    //         updateSinglePokemon(opponentPokemon, 'opponent')
    //         await displayBetterGameText(playerPokemon, opponentPokemon, turnOrder.shift)
    //     }
    //     else{
    //         setShowGameText('Round complete!')
    //     }
    //     setIsRoundDone(true)
    //
    // }


    // async function displayBetterGameText(playerPokemon, opponentPokemon, turnOrder) {
    //     let gameText = '';
    //     setIsRoundDone(false);
    //
    //     // Add guard clause to check if turnOrder[0] exists
    //     if (!turnOrder[0]) {
    //         console.log('Round complete!');
    //         setIsRoundDone(true);
    //         return;
    //     }
    //
    //     console.log(`${turnOrder[0].actor} is going now`);
    //
    //     if (turnOrder[0].actor === "player") {
    //         gameText += `${playerPokemon.name} used ${playerPokemon.moves[0]}\n`;
    //         setShowGameText(gameText);
    //         console.log("updating Player Details")
    //         // updateSinglePokemon(playerPokemon, 'player');
    //         console.log('\n\n Wait for player to press continue')
    //         await waitToContinue();
    //         console.log('\n\n Continue Pressed!')
    //         await displayBetterGameText(playerPokemon, opponentPokemon, turnOrder.slice(1));
    //     } else if (turnOrder[0].actor === "opponent") {
    //         gameText += `${opponentPokemon.name} used ${opponentPokemon.moves[0]}\n`;
    //         setShowGameText(gameText);
    //         console.log("updating opponent Details")
    //         // updateSinglePokemon(opponentPokemon, 'opponent');
    //         console.log('\n\n Wait for player to press continue')
    //         await waitToContinue();
    //         console.log('\n\n Continue Pressed!')
    //         await displayBetterGameText(playerPokemon, opponentPokemon, turnOrder.slice(1));
    //     } else {
    //         setShowGameText('Round complete!');
    //     }
    //
    //     setIsRoundDone(true);
    // }
    //
    // let [update, setUpdate] = useState(false);
    // async function waitToContinue() {
    //     return new Promise(resolve => {
    //         console.log("WaitToContinue(): waiting for Continue To Be Pressed");
    //
    //         const checkContinue = () => {
    //             if (continuePressed) {
    //                 console.log("WaitToContinue(): Continue Pressed");
    //                 setShowGameText(null)
    //                 setUpdate(prev => !prev)
    //                 setContinuePressed(false); // Reset for the next round
    //                 resolve();
    //             } else {
    //                 setTimeout(checkContinue, 100); // Check again after a short delay
    //             }
    //         };
    //
    //         // checkContinue();
    //     });
    // }



    // async function displayBetterGameText(playerPokemon, opponentPokemon, turnOrder){
    //     let gameText = '';
    //     setIsRoundDone(false)
    //
    //     // Add guard clause to check if turnOrder[0] exists
    //     if (!turnOrder[0]) {
    //         console.log('Round complete!')
    //         setIsRoundDone(true)
    //         return
    //     }
    //
    //     console.log(`${turnOrder[0].actor} is going now`);
    //
    //
    //     if(turnOrder[0].actor === "player"){
    //         gameText += `${playerPokemon.name} used ${playerPokemon.moves[0]}\n`;
    //         setShowGameText(gameText);
    //         updateSinglePokemon(playerPokemon, 'player')
    //         while(!continuePressed){
    //             //wait for player to press continue...
    //         }
    //         await displayBetterGameText(playerPokemon, opponentPokemon, turnOrder.shift())
    //
    //     }
    //     else if(turnOrder[0].actor === "opponent"){
    //         gameText += `${opponentPokemon.name} used ${opponentPokemon.moves[0]}\n`;
    //         setShowGameText(gameText);
    //         updateSinglePokemon(opponentPokemon, 'opponent')
    //
    //         while(!continuePressed){
    //             //wait for player to press continue...
    //         }
    //         await displayBetterGameText(playerPokemon, opponentPokemon, turnOrder.shift())
    //     }
    //     else{
    //         setShowGameText('Round complete!')
    //     }
    //     setIsRoundDone(true)
    // }

    return (
        <div className={'game-container'}>
        <div
            className={`battle-container`} style={{ backgroundImage: `url(${stageType})` }} >
            {playerPokemonData && opponentPokemonData ? (
            <div>
                <div className="opponent-pokemon-container">
            <h2>Opponent's Pokemon:</h2>
                <div className={""}>
                    <p>Level: {opponentPokemonData.base_experience}</p>
                    <p>HP: {opponentPokemon && opponentPokemon.hp}</p>
                </div>
        <div>
            <img id={"opponent-pokemon-sprite"}
                src={opponentPokemonData.sprites.front_default}
                alt={opponentPokemon && opponentPokemon.name}
            />
        </div>
        </div>
                <div className="player-pokemon-container">
            <h2>Player's Pokemon:</h2>
                <div>
                    <p>Level: {playerPokemonData.base_experience}</p>
                    {/*<p>HP: {playerPokemonData.stats[0].base_stat}</p>*/}
                    <p>HP: {playerPokemon && playerPokemon.hp}</p>
                </div>
            <div >
                <img id={"player-pokemon-sprite"}
                src={playerPokemonData.sprites.back_default}
                alt={playerPokemon && playerPokemon.name}/>
            </div>
        </div>
            </div>

            ):(
                <p>Loading...</p>
            )}
        </div>
            <div className={`battle-details-container`} style={{ display: isShowingDetailsBox ? 'block' : 'none' }}>
                <div className="battle-options">
                    {isShowingPokeBattleOptions && (
                        <>
                            {/*Fight Option*/}
                            <button id={'top-left'} onClick={() =>{
                                hidePokeBattleOptions()
                                showFightOptions()
                            }}>Fight</button>

                            <button id={'top-right'} onClick={() => {
                                // openBag()
                                hidePokeBattleOptions()
                                console.log("WIP: Displaying Bag Items")
                                // showBagOptions()
                            }}>Bag</button>

                            <button id={'bot-left'} onClick={() => {
                                // performPokemonSwap()
                                // allow cancel & display  Player Pokemon Team
                                hidePokeBattleOptions()
                                console.log("WIP: Display Pokemon to swap")
                            }}>Pokemon</button>

                            <button id={'bot-right'} onClick={() => {
                                hidePokeBattleOptions()
                                if(isTrainerBattle){
                                    console.log("Unable to Escape")
                                    showDetailsBox()
                                    displayText(gameTexts.escapeFail)
                                    setTimeout(2000)
                                    showPokeBattleOptions()
                                }
                                else {
                                    showDetailsBox()
                                    displayText(gameTexts.escapeSuccess)
                                    isBattleState = false;
                                }
                            }}>Run</button>
                        </>
                    )}
                    {isShowingFightOptions && (
                        <>
                            {/*MoveOne*/}
                            <button id={'top-left'} onClick={async () => {
                                console.log("Move One")
                                let results = await startPokeBattleRound("fight", playerPokemon.moves[0], playerPokemon, opponentPokemon, playerPokemonTeam,opponentPokemonTeam)
                                updateDetails(results.playerPokemon, results.opponentPokemon)
                                hideFightOptions()
                                await displayGameText(results.playerPokemon, results.opponentPokemon, results.turnOrder,)
                                checkForWinner()
                            }}>
                                {playerPokemon.moves[0]}
                            </button>

                            {/*MoveTwo*/}
                            <button id={'top-right'} onClick={async () => {
                                console.log("Move Two")
                                let results = await startPokeBattleRound("fight", playerPokemon.moves[1], playerPokemon, opponentPokemon, playerPokemonTeam,opponentPokemonTeam)
                                updateDetails(results.playerPokemon, results.opponentPokemon)
                                setShowGameText(`${playerPokemon.name} used ${playerPokemon.moves[0]}`)
                                checkForWinner()
                            }
                            }>
                                {playerPokemon.moves[1]}
                            </button>

                            {/*MoveThree*/}
                            <button id={'bot-left'} onClick={async () => {
                                console.log("Move Three")
                                let results = await startPokeBattleRound("fight", playerPokemon.moves[2], playerPokemon, opponentPokemon, playerPokemonTeam,opponentPokemonTeam)
                                updateDetails(results.playerPokemon, results.opponentPokemon)
                                setShowGameText(`${playerPokemon.name} used ${playerPokemon.moves[0]}`)
                                checkForWinner()
                            }
                            }>
                                {playerPokemon.moves[2]}
                            </button>

                            {/*MoveFour*/}
                            <button id={'bot-right'} onClick={ async () => {
                                console.log("fight selected")
                                let results = await startPokeBattleRound("fight", playerPokemon.moves[3], playerPokemon, opponentPokemon, playerPokemonTeam,opponentPokemonTeam)
                                updateDetails(results.playerPokemon, results.opponentPokemon)
                                setShowGameText(`${playerPokemon.name} used ${playerPokemon.moves[0]}`)
                                checkForWinner()
                            }
                            }>
                                {playerPokemon.moves[3]}
                            </button>
                        </>
                    )}
                    {isShowingBagOptions && (
                        <>
                        // displayBag()
                            <button id={'top-right'} onClick={() =>{
                                // hidePokeBagOptions()
                                showPokeBattleOptions()
                            }}>
                                Go Back
                            </button>
                        </>
                    )}

                    {showGameText && (
                        <>
                            <p id="display-text" style={{ whiteSpace: 'pre-line' }}>{showGameText}</p>
                            <button id={'continue-btn'} onClick={() =>{
                                console.log("Okay Pressed!")
                                setContinuePressed(true)
                            }}>
                            Continue...
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>


    );
};
export default PokemonBattle
