import React, { useState, useEffect } from 'react';
import './playerPoke.css';
import {playerPokemonTeam} from "./gameData";

const PlayerPoke = () => {
    const [pokemonTeam, setPokemonTeam] = useState(playerPokemonTeam);

    // Fetch and set the Pokemon data for each slot
    useEffect(() => {
        const fetchPokemonData = async () => {
            const promises = pokemonTeam.map(async (pokemonSlot, index) => {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonSlot.name}`);
                if (response.ok) {
                    const data = await response.json();
                    const spriteUrl = data.sprites.front_default;
                    const gender = data.gender_rate === -1 ? 'Genderless' : data.gender_rate === 0 ? 'Female' : 'Male';
                    return { ...pokemonSlot, spriteUrl, level: data.base_experience, gender };
                }
                return pokemonSlot;
            });

            const updatedPokemon = await Promise.all(promises);
            setPokemonTeam(updatedPokemon);
        };

        fetchPokemonData();
    }, []);

    return (
        <div id="player-pokemon">
            <h1>Player's Pokémon Team:</h1>
            <div className="player-pokemon-row">
                {pokemonTeam.slice(0, 2).map((pokemon, index) => (
                    <div key={index} className="player-pokemon-slot">
                        <div className="image-level-container">
                            <div id="pokeImg"> <img src={pokemon.spriteUrl} alt={pokemon.name} /></div>
                            <div id="level"> <p >Level: {pokemon.level}</p> </div>
                        </div>
                        <div className="name-hp-container">
                            <h3>{pokemon.name}</h3>
                            <p>HP: {pokemon.hp}</p>
                        </div>
                        <p id='gender'>Gender: {pokemon.gender}</p>
                    </div>
                ))}
            </div>
            <div className="player-pokemon-row">
                {pokemonTeam.slice(2, 4).map((pokemon, index) => (
                    <div key={index} className="player-pokemon-slot">
                        <div className="image-level-container">
                            <div id="pokeImg"> <img src={pokemon.spriteUrl} alt={pokemon.name} /></div>
                            <div id="level"> <p >Level: {pokemon.level}</p> </div>
                        </div>
                        <div className="name-hp-container">
                            <h3>{pokemon.name}</h3>
                            <p>HP: {pokemon.hp}</p>
                        </div>
                        <p id='gender'>Gender: {pokemon.gender}</p>
                    </div>
                ))}
            </div>
            <div className="player-pokemon-row">
                {pokemonTeam.slice(4, 6).map((pokemon, index) => (
                    <div key={index} className="player-pokemon-slot">
                        <div className="image-level-container">
                            <div id="pokeImg"> <img src={pokemon.spriteUrl} alt={pokemon.name} /></div>
                            <div id="level"> <p >Level: {pokemon.level}</p> </div>
                        </div>
                        <div className="name-hp-container">
                            <h3>{pokemon.name}</h3>
                            <p>HP: {pokemon.hp}</p>
                        </div>
                        <p id='gender'>Gender: {pokemon.gender}</p>
                    </div>
                ))}
            </div>
        </div>
    );

};

export default PlayerPoke;
