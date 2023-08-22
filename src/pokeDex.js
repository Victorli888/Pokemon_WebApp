import React, { useState, useEffect } from 'react';
import './Pokedex.css';

const Pokedex = () => {
    const [spriteUrl, setSpriteUrl] = useState(null);
    const [description, setDescription] = useState("");
    const [types, setTypes] = useState([]);
    const [name, setName] = useState(null);
    const [pokeHeight, setPokeHeight] = useState("");
    const [pokeWeight, setPokeWeight] = useState("");
    const [genus, setGenus] = useState("");
    const [searchID, setSearchID] = useState("");

    const handleSearch = () => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${searchID}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Pokemon not found');
                }
            })
            .then(data => {
                const frontSpriteUrl = data.sprites.front_default;
                setSpriteUrl(frontSpriteUrl);

                const pokemonName = data.name;
                setName(pokemonName);

                const typeNames = data.types.map(typeInfo => typeInfo.type.name);
                setTypes(typeNames);

                const height = data.height;
                setPokeHeight(height / 10);

                const weight = data.weight;
                setPokeWeight(weight / 10);
            })

            fetch(`https://pokeapi.co/api/v2/pokemon-species/${searchID}`)
                .then(response => response.json())
                .then(data => {
                    const englishDescription = data.flavor_text_entries.find(entry => entry.language.name === "en").flavor_text;
                    setDescription(englishDescription);

                    const pokemonGenus = data.genera.find(entry => entry.language.name === "en").genus;
                    setGenus(pokemonGenus)
                })
                .catch(error=>{
                    setDescription("Not Found...")
                    setGenus("Not Found")
                })

            .catch(error => {
                setName("Not Found");
                setDescription("");
                setTypes([]);
                setPokeHeight("");
                setPokeWeight("");
                setGenus("");
                setSpriteUrl(null);
            });
    };

    return (
        <div className="pokedex">
            <div id="pokedex-frame">
                <div id="pokedex-screen">
                    <img src={spriteUrl} alt={name} />
                    <div id="pokedex-pokemon-details">
                        <h3>Type: {types.join(", ")}</h3>
                        <h3>Height: {pokeHeight} m</h3>
                        <h3>Weight: {pokeWeight} kg</h3>
                    </div>
                    <div id="pokedex-data">
                        <div id="name-genus-container">
                            <h2 id="pokedex-pokemon-name">{name}</h2>
                            <div id={"pokedex-pokemon-genus"}><h3>{genus}</h3></div>
                        </div>
                        <div id="pokedex-search"> {/* New div for search */}
                            <input
                                type="text"
                                placeholder="Enter Name or ID"
                                value={searchID}
                                onChange={event => setSearchID(event.target.value)}
                            />
                            <button onClick={handleSearch}>Search</button>
                        </div>
                    </div>
                </div>
                <div id="pokedex-description">
                    <p>{description}</p>
                </div>
            </div>
        </div>
    );
};
export default Pokedex;
