import React, {useEffect, useState} from 'react';
import SelectPlayerPoke from "./selectPlayerPoke";

// Importing Redux logic for using potions to heal pokemon
import {useDispatch, useSelector} from "react-redux";
import {updatePokemon} from "./redux/actions/pokemonActions";
import {REMOVE_FROM_POKEBAG} from "./redux/actionTypes/actionTypes";

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
    const pokeBag = useSelector(state => Object.keys(state.pokeInventory).map(key => ({
        name: key,
        ...state.pokeInventory[key]
    })));
    // Converting from local state to Redux
    // const playerBag = Object.keys(playerBagOriginal).map(key => ({
    //     name: key,
    //     ...playerBagOriginal[key]
    // }));

    // Converting from local state to Redux, we will no longer be using useState
    // const [pokeBag, setPokeBag] = useState(playerBag);

    const [isShowingItems, setIsShowingItems] = useState(true);
    const [isShowingPokemonSelector, setIsShowPokemonSelector] = useState(false);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const dispatch = useDispatch();


    function selectAndApplyOnPokemon(pokemon, item) {
        if (pokemon === null || item === null) {
            throw new Error('Pokemon or item is null');
        }

        console.log(`Healing Pokemon ${pokemon.name} for ${item.potency} Points.`)
        let updatedPokemon = {...pokemon, hp: pokemon.hp + item.potency}
        dispatch(updatePokemon(updatedPokemon))
        console.log(`${pokemon.name} now has ${pokemon.hp} HP`)
        dispatch({type: REMOVE_FROM_POKEBAG, payload:{name: item.name}});
    }

    //// Redux Version of HandleItemUse
    const handleItemUse = (itemName) => {
        const itemToUse = pokeBag.find(item => item.name === itemName);

        if (itemToUse && itemToUse.quantity > 0) {
            // Open Pokemon Selector
            setIsShowPokemonSelector(true)
            setSelectedItem(itemToUse)
            if (selectedItem != null){
                console.log(`Item Selected: ${selectedItem.name}`);

            }
        }
    }

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
                <SelectPlayerPoke onSelectPokemon = {handleSelectPokemon}/>
            )}
        </div>
    );
};

export default PokeBag;
