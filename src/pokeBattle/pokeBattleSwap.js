import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from "react-redux"; // STEP 1
import {updatePokemon} from "../redux/actions/pokemonActions"; //STEP 1
import {setPlayerChoice, setPlayerCurrentPokemon, startTurn, swapPokemon} from "../redux/actions/pokeBattleActions";
import './pokeBattleSwap.css';
import SelectPokemon from "./selectPokemon";
// import {playerPokemonTeam} from "./gamePokeTeams";

const PokeBattleSwap = ({onSelectPokemon}) => {
    // Remove for Step 2: replacing useState with useDispatch

    const dispatch = useDispatch(); // STEP 3: using useDispatch
    const [isContainerVisible, setIsContainerVisible] = useState(true)

    const handleSelectPokemon = (selectedPokemon) => {
        setIsContainerVisible(false)
        console.log(`THIS POKEMON PICKED TO BE SWAPPED: ${selectedPokemon.name}`)
        dispatch(setPlayerChoice("swap", selectedPokemon))
        dispatch(startTurn())
    };

    if (!isContainerVisible) {
        return null; // do not render anything if isContainerVisible is false
    }

    return (
        <div className={`pokeBattleSwap-container`}>
            <h2>Pick A Pokemon To Swap To!</h2>
            <SelectPokemon onSelectPokemon={handleSelectPokemon} />
        </div>

    )
}

export default PokeBattleSwap;
