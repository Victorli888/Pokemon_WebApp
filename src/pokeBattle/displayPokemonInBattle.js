import React, { useState, useEffect } from 'react';
import './displayPokemonInBattle.css';
import '../index.css';
// import {gameTexts} from "./gameTexts";
import {requestPokemonData, updatePokemon} from "../redux/actions/pokemonActions";
import {useDispatch, useSelector} from "react-redux";
import {
    setOpponentCurrentPokemon,
    setOpponentTeam,
    setPlayerCurrentPokemon,
    setPlayerTeam
} from "../redux/actions/pokeBattleActions";



const DisplayPokemonInBattle = () => {
    const dispatch = useDispatch();

    // const pokemonTeams = useSelector(state => state.teams);
    // const pokemonData = useSelector(state => state.pokemon)
    // const currentOpponent = useSelector(state => state.battleState.currentOpponent)
    // const opponentTeam = convertToPokemonObjects(pokemonTeams[currentOpponent])
    // const playerTeam = convertToPokemonObjects(pokemonTeams.Player)

    // dispatch(setOpponentTeam(opponentTeam))
    // dispatch(setPlayerTeam(playerTeam))
    // dispatch(setOpponentCurrentPokemon(opponentTeam[0]))
    // dispatch(setPlayerCurrentPokemon(playerTeam[0]))

    //TODO: FOR TESTING DISPLAYING POKEMON REMOVE AFTER :

    const playerPokemon = useSelector(state => state.battleState.playerCurrentPokemon)
    const opponentPokemon= useSelector(state => state.battleState.opponentCurrentPokemon);
    const playerPokemonData = useSelector(state => state.pokemon[playerPokemon.name]);
    const opponentPokemonData = useSelector(state => state.pokemon[opponentPokemon.name]);
    const stageType = useSelector(state=> state.battleState.currentStageType)


    function refreshPage() {
        window.location.reload();
    }

    // function convertToPokemonObjects(trainerPokemonTeam) {
    //     console.log(`This is the team we are converting: ${trainerPokemonTeam}`)
    //     return trainerPokemonTeam.map(name => pokemonData[name]);
    // }

    // useEffect(() => {
    //     dispatch(requestPokemonData(playerPokemon.name));
    //     dispatch(requestPokemonData(opponentPokemon.name));
    // }, [opponentPokemon, playerPokemon, dispatch]);

    useEffect(() => {
        console.log(`${playerPokemon.hp}, ${playerPokemonData}`)
        if (playerPokemon && playerPokemon.name && !playerPokemonData.sprites) {
            dispatch(requestPokemonData(playerPokemon.name));
        }
        console.log(`${opponentPokemon.hp}, ${opponentPokemonData}`)
        if (opponentPokemon && opponentPokemon.name && !opponentPokemonData.sprites) {
            dispatch(requestPokemonData(opponentPokemon.name));
        }
    }, [opponentPokemon, playerPokemon, playerPokemonData, opponentPokemonData, dispatch]);



    return (
        <div className={`battle-container`} style={{ backgroundImage: `url(${stageType})` }} >
            {playerPokemonData && opponentPokemonData ? (
                <div>
                    <div className="opponent-pokemon-container">
                        <h2>Opponent's Pokemon:</h2>
                        <div className={""}>
                            <p>Level: {opponentPokemonData.base_experience}</p>
                            <p>HP: {opponentPokemon && opponentPokemon.hp}</p>
                        </div>
                        <div>
                            {opponentPokemonData.sprites && opponentPokemonData.sprites.front_default && (
                                <img id={"opponent-pokemon-sprite"}
                                     src={opponentPokemonData.sprites.front_default}
                                     alt={opponentPokemon && opponentPokemon.name}
                                />
                            )}
                        </div>
                    </div>
                    <div className="player-pokemon-container">
                        <h2>Player's Pokemon:</h2>
                        <div>
                            <p>Level: {playerPokemonData.base_experience}</p>
                            <p>HP: {playerPokemon && playerPokemon.hp}</p>
                        </div>
                        <div>
                            {playerPokemonData.sprites && playerPokemonData.sprites.back_default && (
                                <img id={"player-pokemon-sprite"}
                                     src={playerPokemonData.sprites.back_default}
                                     alt={playerPokemon && playerPokemon.name}/>
                            )}
                        </div>
                    </div>
                </div>

            ):(
                <p>Loading...</p>
            )}
        </div>
    );
};
export default DisplayPokemonInBattle
