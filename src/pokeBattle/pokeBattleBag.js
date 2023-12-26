import React, {useEffect, useState} from 'react';
import SelectPokemon from "./selectPokemon";
import './pokeBattleBag.css'

// Importing Redux logic for using potions to heal pokemon
import {useDispatch, useSelector} from "react-redux";
import {updatePokemon} from "../redux/actions/pokemonActions";
import {REMOVE_FROM_POKEBAG} from "../redux/actionTypes/actionTypes";
import {setItemToUse, setPlayerChoice, startTurn} from "../redux/actions/pokeBattleActions";

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

const PokeBattleBag = () => {
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
    const [isContainerVisible, setIsContainerVisible] = useState(true)
    // const [selectedItem, setSelectedItem] = useState(null);
    const dispatch = useDispatch();


    // function selectAndApplyOnPokemon(pokemon, item) {
    //     let fightLog = [];
    //     if (pokemon === null || item === null) {
    //         throw new Error('Pokemon or item is null');
    //     }
    //
    //     let updatedPokemon = {...pokemon, hp: pokemon.hp + item.potency}
    //     fightLog.push(`Player used ${item.name} to Heal Pokemon ${pokemon.name} for ${item.potency} Points.`)
    //     dispatch(updatePokemon(updatedPokemon))
    //     dispatch(showText(fightLog))
    //     // console.log(`${pokemon.name} now has ${pokemon.hp} HP`)
    //     dispatch({type: REMOVE_FROM_POKEBAG, payload:{name: item.name}});
    // }

    //// Redux Version of HandleItemUse
    const handleItemUse = (itemName) => {
        const itemToUse = pokeBag.find(item => item.name === itemName);

        if (itemToUse && itemToUse.quantity > 0) {
            // Open Pokemon Selector
            setIsShowPokemonSelector(true)
            // setSelectedItem(itemToUse)
            dispatch(setItemToUse(itemToUse))
            // if (selectedItem != null){
            //     console.log(`Item Selected: ${selectedItem.name}`);
            //
            // }
        }
    }
    //
    // useEffect(() => {
    //     if (selectedItem !== null && selectedPokemon !== null) {
    //         try {
    //             selectAndApplyOnPokemon(selectedPokemon, selectedItem);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //
    //         setSelectedItem(null);
    //         setSelectedPokemon(null);
    //     }
    // }, [setSelectedItem, selectedPokemon]);
    if (!isContainerVisible) {
        return null; // do not render anything if isContainerVisible is false
    }

    const handleSelectPokemon = (selectedPokemon) => {
        // setSelectedPokemon(selectedPokemon);
        setIsShowPokemonSelector(false)
        setIsShowingItems(false)
        setIsContainerVisible(false)
        dispatch(setPlayerChoice("bag", selectedPokemon))
        dispatch(startTurn())


    };

    return (
        <div className={'pokeBattleBag-container'}>
            <div id="pokeBattleBag">
                {isShowingItems && (
                    <>
                        <h3 id={"pokeBattleBag"}>Poké Bag:</h3>
                        <ItemList pokeBag={pokeBag} handleItemUse={handleItemUse}/>
                    </>
                )}
                {isShowingPokemonSelector && (
                    <SelectPokemon onSelectPokemon={handleSelectPokemon}/>
                )}
            </div>
        </div>

    );
};

export default PokeBattleBag;
