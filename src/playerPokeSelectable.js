import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from "react-redux"; // STEP 1
import {updatePokemon} from "./redux/actions/pokemonActions"; //STEP 1
import './playerPoke.css';
// import {playerPokemonTeam} from "./gamePokeTeams";

const PlayerPoke = ({onSelectPokemon}) => {
    // Remove for Step 2: replacing useState with useDispatch
    const [displayTeam, setDisplayTeam] = useState([]);
    const pokemonTeam = useSelector(state => state.teams.Player);
    const pokemonDataState = useSelector(state => state.pokemon);
    const dispatch = useDispatch(); // STEP 3: using useDispatch

    const handlePokemonSelect = (selectedPokemon) =>{
        // onSelectPokemon(selectedPokemon)
        console.log(`${selectedPokemon.name} was selected!`)
        onSelectPokemon(selectedPokemon)
    }

    useEffect(() => {
        const fetchPokemonData = async () => {
            const promises = pokemonTeam.map(async (pokemonSlotName) => {
                const pokemonSlot = pokemonDataState[pokemonSlotName];
                if (pokemonSlot) {
                    console.log(`fetching data for ${pokemonSlot.name}`)
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonSlot.name}`);
                    if (response.ok) {
                        console.log(`fetch for ${pokemonSlot.name} was okay!`)
                        const data = await response.json();
                        const spriteUrl = data.sprites.front_default;
                        const gender = data.gender_rate === -1 ? 'Genderless' : data.gender_rate === 0 ? 'Female' : 'Male';
                        return { ...pokemonSlot, spriteUrl, level: data.base_experience, gender };
                    } else {
                        throw new Error(`Error fetching data for ${pokemonSlot.name}`);
                    }
                }
                return pokemonSlot;
            });

            const updatedPokemonTeam = await Promise.all(promises);
            setDisplayTeam(updatedPokemonTeam);
        };

        fetchPokemonData();
    }, [pokemonTeam, pokemonDataState]);

    return (
        <div id="player-pokemon">
            <h1>Player's Pokémon Team:</h1>
            <div className="player-pokemon-row">
                {displayTeam.slice(0, 2).map((pokemon, index) => (
                    <div key={index} className="player-pokemon-slot">
                        <div className="image-level-container">
                            <div id="pokeImg"> <img src={pokemon.spriteUrl} alt={pokemon.name} onClick={() => handlePokemonSelect(pokemon)} /></div>
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
                {displayTeam.slice(2, 4).map((pokemon, index) => (
                    <div key={index} className="player-pokemon-slot">
                        <div className="image-level-container">
                            <div id="pokeImg"> <img src={pokemon.spriteUrl} alt={pokemon.name} onClick={() => handlePokemonSelect(pokemon)} /></div>
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
                {displayTeam.slice(4, 6).map((pokemon, index) => (
                    <div key={index} className="player-pokemon-slot">
                        <div className="image-level-container">
                            <div id="pokeImg"> <img src={pokemon.spriteUrl} alt={pokemon.name} onClick={() => handlePokemonSelect(pokemon)} /></div>
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
