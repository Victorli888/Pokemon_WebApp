import React, { useState, useEffect } from 'react';
import './playerPoke.css';

const PlayerPoke = () => {
    const [playerPokemon, setPlayerPokemon] = useState([
        { name: "None1", currentHP: 0, level: 0, spriteUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png", gender: '' },
        { name: "None2", currentHP: 0, level: 0, spriteUrl: null, gender: '' },
        { name: "None3", currentHP: 0, level: 0, spriteUrl: null, gender: '' },
        { name: "None4", currentHP: 0, level: 0, spriteUrl: null, gender: '' },
        { name: "None5", currentHP: 0, level: 0, spriteUrl: null, gender: '' },
        { name: "None6", currentHP: 0, level: 0, spriteUrl: null, gender: '' }
    ]);

    // Fetch and set the Pokemon data for each slot
    useEffect(() => {
        const fetchPokemonData = async () => {
            const promises = playerPokemon.map(async (pokemonSlot, index) => {
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
            setPlayerPokemon(updatedPokemon);
        };

        fetchPokemonData();
    }, []);

    return (
        <div id="player-pokemon">
            <h1>Player's Pokémon:</h1>
            <div className="player-pokemon-row">
                {playerPokemon.slice(0, 2).map((item, index) => (
                    <div key={index} className="player-pokemon-slot">
                        <div className="image-level-container">
                            <div id="pokeImg"> <img src={item.spriteUrl} alt={item.name} /></div>
                            <div id="level"> <p >Level: {item.level}</p> </div>
                        </div>
                        <div className="name-hp-container">
                            <h3>{item.name}</h3>
                            <p>HP: {item.currentHP}</p>
                        </div>
                        <p id='gender'>Gender: {item.gender}</p>
                    </div>
                ))}
            </div>
            <div className="player-pokemon-row">
                {playerPokemon.slice(2, 4).map((item, index) => (
                    <div key={index} className="player-pokemon-slot">
                        <div className="image-level-container">
                            <div id="pokeImg"> <img src={item.spriteUrl} alt={item.name} /></div>
                            <div id="level"> <p >Level: {item.level}</p> </div>
                        </div>
                        <div className="name-hp-container">
                            <h3>{item.name}</h3>
                            <p>HP: {item.currentHP}</p>
                        </div>
                        <p id='gender'>Gender: {item.gender}</p>
                    </div>
                ))}
            </div>
            <div className="player-pokemon-row">
                {playerPokemon.slice(4, 6).map((item, index) => (
                    <div key={index} className="player-pokemon-slot">
                        <div className="image-level-container">
                            <div id="pokeImg"> <img src={item.spriteUrl} alt={item.name} /></div>
                            <div id="level"> <p >Level: {item.level}</p> </div>
                        </div>
                        <div className="name-hp-container">
                            <h3>{item.name}</h3>
                            <p>HP: {item.currentHP}</p>
                        </div>
                        <p id='gender'>Gender: {item.gender}</p>
                    </div>
                ))}
            </div>
        </div>
    );

};

export default PlayerPoke;
