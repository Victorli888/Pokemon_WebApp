import React, { useState, useEffect } from 'react';
import './pokeBattle.css';
import './index.css';

const PokemonBattle = ({ battleStarted, playerPokemon, opponentPokemon, stageType }) => {
    console.log(`Attempting pokemon battle with ${playerPokemon} & ${opponentPokemon}`)
    const [playerPokemonData, setPlayerPokemonData] = useState(null);
    const [opponentPokemonData, setOpponentPokemonData] = useState(null);
    const [isShowingBattleOptions, setIsShowingBattleOptions] = useState(true);
    const [isShowingBattleDetails, setIsShowingBattleDetails] = useState(true);


    // Call this function when you want to hide the battle options and buttons.
    const hideBattleOptionsAndButtons = () => {
        setIsShowingBattleOptions(false);
    };

// Call this function when you want to show the battle options and buttons again.
    const showBattleOptionsAndButtons = () => {
        setIsShowingBattleOptions(true);
    };

// Call this function when the Pokémon is making an attack to hide the battle details.
    const hideBattleDetails = () => {
        setIsShowingBattleDetails(false);
    };

// Call this function when you want to show the battle details again.
    const showBattleDetails = () => {
        setIsShowingBattleDetails(true);
    };



    useEffect(() => {
        if (battleStarted) {
            // Fetch player's Pokémon data from the API
            console.log(`fetching ${playerPokemon}`)
            fetchPokemonData(playerPokemon, setPlayerPokemonData);

            // Fetch opponent's Pokémon data from the API
            console.log(`attempt fetch ${opponentPokemon}`)
            fetchPokemonData(opponentPokemon, setOpponentPokemonData);
        }
    }, [battleStarted, opponentPokemon, playerPokemon]);

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
                    <p>HP: {opponentPokemonData.stats[0].base_stat}</p>
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
                    <p>HP: {playerPokemonData.stats[0].base_stat}</p>
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
            <div className={`battle-details-container`} style={{ display: isShowingBattleDetails ? 'block' : 'none' }}>

                <div className="battle-options">
                    {isShowingBattleOptions && (
                        <>

                            {/*<button onClick={handleFight}>Fight</button>*/}
                            {/*<button onClick={handleBag}>Bag</button>*/}
                            {/*<button onClick={handlePokemon}>Pokemon</button>*/}
                            {/*<button onClick={handleRun}>Run</button>*/}

                            <button id={'top-left'}>Fight</button>
                            <button id={'top-right'}>Bag</button>
                            <button id={'bot-left'}>Pokemon</button>
                            <button id={'bot-right'}>Run</button>
                        </>
                    )}
                </div>
            </div>

        </div>


    );
};
export default PokemonBattle;
