import React, { useState, useEffect } from 'react';
import './pokeBattle.css';

const PokemonBattle = ({ battleStarted, playerPokemon, opponentPokemon, stageType }) => {
    console.log(`Attempting pokemon battle with ${playerPokemon} & ${opponentPokemon}`)
    const [playerPokemonData, setPlayerPokemonData] = useState(null);
    const [opponentPokemonData, setOpponentPokemonData] = useState(null);

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
        <div
            className={`battle-container`} style={{ backgroundImage: `url(${stageType})` }} >
            {playerPokemonData && opponentPokemonData ? (
            <div className="opponent-pokemon">
                <h2>Opponent's Pokemon:</h2>
                    <div>
                        <p>Level: {opponentPokemonData.base_experience}</p>
                        <p>HP: {opponentPokemonData.stats[0].base_stat}</p>
                    </div>
            <div>
                <img
                    src={opponentPokemonData.sprites.front_default}
                    alt={opponentPokemon.name}
                />
            </div>
            <div className="player-pokemon">
                <h2>Player's Pokemon:</h2>
                    <div>
                        <p>Level: {playerPokemonData.base_experience}</p>
                        <p>HP: {playerPokemonData.stats[0].base_stat}</p>
                    </div>
                <div>
                    <img
                    src={playerPokemonData.sprites.back_default}
                    alt={playerPokemon.name}/>
                </div>
            </div>
            {/* Add battle mechanics and UI here */}
        </div>
            ):(
                <p>Loading...</p>
            )}
        </div>
    );
};
export default PokemonBattle;
