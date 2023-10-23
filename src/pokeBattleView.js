import React, { useState, useEffect } from 'react';
import {attemptEscape, performBagAction, performPokemonSwap, startFightMove} from "./pokeBattleLogic";
import './pokeBattle.css';
import './index.css';

function setPlayerPokemonState(playerPokemon) {}
function setOpponentPokemonState(opponentPokemon) {}

const PokemonBattle = ({isInBattle, playerPokemonTeam, opponentPokemonTeam, stageType }) => {
    var playerPokemon = playerPokemonTeam[0]
    var opponentPokemon = opponentPokemonTeam[0]
    console.log(`Attempting pokemon battle with ${playerPokemon.name} & ${opponentPokemon.name}`)
    const [playerPokemonData, setPlayerPokemonData] = useState(null);
    const [opponentPokemonData, setOpponentPokemonData] = useState(null);
    const [isShowingDetailsBox, setIsShowingDetailsBox] = useState(true);
    const [isShowingPokeBattleOptions, setIsShowingPokeBattleOptions] = useState(true);
    const [isShowingFightOptions, setIsShowingFightDetails] = useState(false)


    // Call this function when you want to hide the battle options and buttons.
    const hidePokeBattleOptions = () => {
        setIsShowingPokeBattleOptions(false);
    };

// Call this function when you want to show the battle options and buttons again.
    const showBattleOptionsAndButtons = () => {
        setIsShowingPokeBattleOptions(true);
    };

// Call this function when the Pokémon is making an attack to hide the battle details.
    const hideDetailsBox = () => {
        setIsShowingDetailsBox(false);
    };

// Call this function when you want to show the battle details again.
    const showBattleDetails = () => {
        setIsShowingDetailsBox(true);
    };

    const showFightDetails = () => {
        setIsShowingFightDetails(true)
    }

    const hideFightDetails = () => {
        setIsShowingFightDetails(false)
    }

    const handlefightSelection = async (fightMove) => {
        const updatedPokemonState = await startFightMove(fightMove, playerPokemon, opponentPokemon);
        setPlayerPokemonState(updatedPokemonState.attackingPokemon);
        setOpponentPokemonState(updatedPokemonState.defendingPokemon);
        hideFightDetails();
        hideDetailsBox();
    };

    useEffect(() => {
        if (isInBattle) {
            // Fetch player's Pokémon data from the API
            console.log(`fetching ${playerPokemon.name}`)
            fetchPokemonData(playerPokemon.name, setPlayerPokemonData);

            // Fetch opponent's Pokémon data from the API
            console.log(`attempt fetch ${opponentPokemon.name}`)
            fetchPokemonData(opponentPokemon.name, setOpponentPokemonData);
        }
    }, [isInBattle, opponentPokemon, playerPokemon]);

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
                                showFightDetails()
                            }}>Fight</button>

                            <button id={'top-right'} onClick={() => {
                                performBagAction()
                                // Display bag
                            }}>Bag</button>

                            <button id={'bot-left'} onClick={() => {
                                performPokemonSwap()
                                // ALlow canacel & display  Player Pokemon Team
                            }}>Pokemon</button>

                            <button id={'bot-right'} onClick={() => {
                                attemptEscape()
                                // Prevent Escape for certain scenarios
                                // set isBattle to false if successful
                            }}>Run</button>
                        </>
                    )}

                    {isShowingFightOptions && (
                        <>
                            {/*MoveOne*/}
                            <button id={'top-left'} onClick={() => handlefightSelection(playerPokemon.moves[0])}>
                                {playerPokemon.moves[0]}
                            </button>

                            {/*MoveTwo*/}
                            <button id={'top-right'} onClick={() => handlefightSelection(playerPokemon.moves[1])}>
                                {playerPokemon.moves[1]}
                            </button>

                            {/*MoveThree*/}
                            <button id={'bot-left'} onClick={() => handlefightSelection(playerPokemon.moves[2])}>
                                {playerPokemon.moves[2]}
                            </button>

                            {/*MoveFour*/}
                            <button id={'bot-right'} onClick={() => handlefightSelection(playerPokemon.moves[3])}>
                                {playerPokemon.moves[3]}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>


    );
};
export default PokemonBattle;
