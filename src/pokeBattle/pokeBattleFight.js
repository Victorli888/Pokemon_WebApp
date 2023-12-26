// import React, { useState, useEffect } from 'react';
// import {
//     attemptEscape,
//     performBagAction,
//     performPokemonSwap,
//     startFightMove,
//     pokeBattleEngine,

// } from "./pokeBattleLogic";
// import './pokeBattle.css';
// import './index.css';
// import {gameTexts} from "./gameTexts";
// import {updatePokemon} from "./redux/actions/pokemonActions";
import {useDispatch, useSelector} from "react-redux";
import React from "react";
import {setPokeOptionsState} from "../redux/actions/StateActions";
import {
    calculateDamage,
    chooseFightMove, determineTurnOrder, endTurn, getUserResponse,
    setFainted,
    performMove,
    pickMove, setPlayerAction, setPlayerChoice, setTurnOrder,
    startTurn
} from "../redux/actions/pokeBattleActions";


const PokemonFight = () => {

    const pokemonData = useSelector(state => state.pokemon);
    const playerPokemon = useSelector(state => state.battleState.playerCurrentPokemon);
    const opponentPokemon = useSelector(state => state.battleState.opponentCurrentPokemon)
    const currentPhase = useSelector(state => state.battleState.currentPhase)
    const turnOrderTemp = useSelector(state => state.battleState.turnOrder)
    const dispatch = useDispatch();




    function handleFightMove(selectedMove) {
        console.log('handling fight move! ')
        console.log(`Turn order before Starting Turn: ${turnOrderTemp}`)
        dispatch(setPlayerChoice("fight", selectedMove))
        // dispatch(determineTurnOrder(playerPokemon, opponentPokemon))
        dispatch(startTurn())


    }

    const buttonPositions = ['top-left', 'top-right', 'bot-left', 'bot-right'];

    return (
        <div className={`pokeOptions-container`}>
            <div className={"pokeBattle-options"}>
                {playerPokemon.moves.map((item, index) => (
                    <button key={index}
                            id={buttonPositions[index]}
                            onClick={() => handleFightMove(item)}>
                        {item}
                    </button>
                ))}
            </div>
        </div>
    );
};
export default PokemonFight
