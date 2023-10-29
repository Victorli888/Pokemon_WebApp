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
    const [isShowingOkayOption, setIsShowingOkayOption] = useState(false);

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

    const hideFightDetails = () => {
        setIsShowingFightOptions(false)
    }

    function displayText(text) {
        return (
            <div>
                <p>{text}</p>
            </div>
        );
    }

    function updateDetails(){

        console.log("updating Details")
        hidePokeBattleOptions()
        hideFightDetails()
        setIsShowingOkayOption(true)

        if(playerPokemon && playerPokemon.willWhiteOut){
            console.log("GAME OVER")
            isBattleState = false;
            console.log(`BattleState Now set to ${isBattleState}`)
        }
        if(opponentPokemon && opponentPokemon.willWhiteOut){
            console.log("YOU WIN!")
            console.log(`WHITE OUT VALUE: ${opponentPokemon.willWhiteOut}`)
            isBattleState = false;
            console.log(`BattleState Now set to ${isBattleState}`)

        }

        hideFightDetails();
        hideDetailsBox();



        if(isBattleState){
            showDetailsBox()
            // showPokeBattleOptions()
        }
        else{
            hideDetailsBox()
        }
    };

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
                    <p>HP: {opponentPokemon.hp}</p>
                </div>
        <div>
            <img id={"opponent-pokemon-sprite"}
                src={opponentPokemonData.sprites.front_default}
                alt={opponentPokemon.name}
            />
        </div>
        </div>
                <div className="player-pokemon-container">
            <h2>Player's Pokemon:</h2>
                <div>
                    <p>Level: {playerPokemonData.base_experience}</p>
                    {/*<p>HP: {playerPokemonData.stats[0].base_stat}</p>*/}
                    <p>HP: {playerPokemon.hp}</p>
                </div>
            <div >
                <img id={"player-pokemon-sprite"}
                src={playerPokemonData.sprites.back_default}
                alt={playerPokemon.name}/>
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
                                displayText("WIP: Displaying Bag Items")
                                // showBagOptions()
                            }}>Bag</button>

                            <button id={'bot-left'} onClick={() => {
                                // performPokemonSwap()
                                // allow cancel & display  Player Pokemon Team
                                hidePokeBattleOptions()
                                displayText("WIP: Display Pokemon to swap")
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
                                let results = await startPokeBattleRound("fight", playerPokemon.moves[0], playerPokemon, opponentPokemon)
                                updateDetails(results.playerPokemon, results.opponentPokemon)
                            }}>
                                {playerPokemon.moves[0]}
                            </button>

                            {/*MoveTwo*/}
                            <button id={'top-right'} onClick={() => {
                                console.log("Move Two")
                                let results = startPokeBattleRound("fight", playerPokemon.moves[1], playerPokemon, opponentPokemon)
                                updateDetails(results.playerPokemon, results.opponentPokemon)
                            }
                            }>
                                {playerPokemon.moves[1]}
                            </button>

                            {/*MoveThree*/}
                            <button id={'bot-left'} onClick={() => {
                                console.log("Move Three")
                                let results = startPokeBattleRound("fight", playerPokemon.moves[2], playerPokemon, opponentPokemon)
                                updateDetails(results.playerPokemon, results.opponentPokemon)
                            }
                            }>
                                {playerPokemon.moves[2]}
                            </button>

                            {/*MoveFour*/}
                            <button id={'bot-right'} onClick={ () => {
                                console.log("fight selected")
                                let results = startPokeBattleRound("fight", playerPokemon.moves[3], playerPokemon, opponentPokemon)
                                updateDetails(results.playerPokemon, results.opponentPokemon)
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

                    {isShowingOkayOption && (
                        <>
                            <p1 id={'display-text'}>a git-based workflow for continuous deployment and hosting of full-stack web apps.</p1>

                            <button id={'continue-btn'} onClick={() =>{
                                console.log("Okay Pressed!")
                                setIsShowingOkayOption(false)
                                showPokeBattleOptions()
                                showDetailsBox()
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
export default PokemonBattle;
