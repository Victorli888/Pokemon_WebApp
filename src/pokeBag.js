import React, {useEffect, useState} from 'react';
import { playerBag as playerBagOriginal } from "./gamePokeInventory";
import PlayerPoke from "./playerPokeSelectable";

const Item = ({ item, handleItemUse }) => (
    <li>
        {item.name} - {item.quantity} in Bag
        <button
            onClick={() =>
                handleItemUse(item.name)}
            disabled={item.quantity === 0 || item.type !== 'healing'}
        >
            Use
        </button>
    </li>
);

const ItemList = ({ pokeBag, handleItemUse }) => (
    <ul>
        {pokeBag.map((item, index) => (
            <Item key={index} item={item} handleItemUse={handleItemUse} />
        ))}
    </ul>
);



const PokeBag = () => {
    const playerBag = Object.keys(playerBagOriginal).map(key => ({
        name: key,
        ...playerBagOriginal[key]
    }));

    const [pokeBag, setPokeBag] = useState(playerBag);
    const [isShowingItems, setIsShowingItems] = useState(true);
    const [isShowingPokemonSelector, setIsShowPokemonSelector] = useState(false);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null)


    function selectAndApplyOnPokemon(pokemon, item) {
        if (pokemon === null || item === null) {
            throw new Error('Pokemon or item is null');
        }

        console.log(`Healing Pokemon ${pokemon.name} for ${item.potency} Points.`)
        console.log(`${pokemon.name} now has ${pokemon.hp} HP`)
        pokemon.hp += item.potency;
    }

    const handleItemUse = (itemName) => {
        let updatedBag = pokeBag.map(item => {
            if (item.name === itemName && item.quantity > 0) {
                // Open Selector here
                setIsShowPokemonSelector(true)
                setSelectedItem(item)
                if ( selectedItem != null){
                    console.log(`Item Selected: ${selectedItem.name}`)
                }

                return { ...item, quantity: item.quantity - 1 };

            }
            return item;
        });
        setPokeBag(updatedBag);
    };

    useEffect(() => {
        if (selectedItem !== null && selectedPokemon !== null) {
            try {
                selectAndApplyOnPokemon(selectedPokemon, selectedItem);
            } catch (error) {
                console.log(error);
            }

            setSelectedItem(null);
            setSelectedPokemon(null);
        }
    }, [selectedItem, selectedPokemon]);

    const handleSelectPokemon = (pokemon) => {
        setSelectedPokemon(pokemon);
        setIsShowPokemonSelector(false);
    };

    return (
        <div id="poke-bag">
            {isShowingItems && (
                <>
                    <h3>Poké Bag:</h3>
                    <ItemList pokeBag={pokeBag} handleItemUse={handleItemUse} />
                </>
            )}
            {isShowingPokemonSelector && (
                <PlayerPoke onSelectPokemon = {handleSelectPokemon}/>
            )}
        </div>
    );
};

export default PokeBag;
