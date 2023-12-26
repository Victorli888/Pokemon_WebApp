import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    startBattle,
    pickOption,
    determineTurnOrder,
    setOpponentTeam,
    setPlayerTeam, setOpponentCurrentPokemon, setPlayerCurrentPokemon
} from '../redux/actions/pokeBattleActions';
import PokeBattleText from "./PokeBattleText"
import DisplayPokemonInBattle from "./displayPokemonInBattle"
import PokeBattleOptions from "./pokeBattleOptions";
import PokemonFight from "./pokeBattleFight";
import PokeBattleFight from "./pokeBattleFight";
import PokeBattleBag from "./pokeBattleBag";
import PokeBattleSwap from "./pokeBattleSwap";
import PokeBattleRun from "./pokeBattleRun";
import {setPokeOptionsState} from "../redux/actions/StateActions";
import {initialTeamsState as pokemonTeams} from "../redux/data/initialState";
import {convertToPokemonObjects} from "./utility";
import {pokemonBattles} from "../gamePokeBattles";

function PokeBattleComponent() {
    const dispatch = useDispatch();
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const pokemonData = useSelector(state => state.pokemon)
    const currentOpponent = useSelector(state => state.battleState.currentOpponent)
    const currentPlayerPokemon = useSelector(state => state.playerCurrentPokemon);
    const currentPhase = useSelector(state => state.battleState.currentPhase)
    // const opponentTeam = useSelector(state => state.battleState.opponentCurrentTeam)
    // const playerTeam = useSelector(state => state.battleState.playerCurrentTeam)

    // const storyProgress = useSelector(state => state.battleState.);
    // const [showPokeBattleOptions, setShowPokeBattleOptions] = useState(false)

    // Create Initial PokemonTeam Objects and set Initial State for pokeBattle
    const initialOpponentTeam = convertToPokemonObjects(pokemonTeams[currentOpponent], pokemonData)
    const initialPlayerTeam = convertToPokemonObjects(pokemonTeams.Player, pokemonData)

    useEffect(() => {
        // This will run once when the component mounts
        dispatch(setOpponentTeam(initialOpponentTeam));
        dispatch(setPlayerTeam(initialPlayerTeam));
        dispatch(setOpponentCurrentPokemon(initialOpponentTeam[0]));
        dispatch(setPlayerCurrentPokemon(initialPlayerTeam[0]));
        setIsDataLoaded(true)

    }, []);

    // useEffect(() => {
    //     dispatch(setPlayerTeam(playerTeam))
    //     dispatch(setOpponentTeam(opponentTeam))
    //
    // }, [playerTeam, opponentTeam]);

    const currentOpponentPokemon = useSelector(state => state.opponentCurrentPokemon)
    dispatch(determineTurnOrder(currentPlayerPokemon, currentOpponentPokemon))

    // function convertToPokemonObjects(trainerPokemonTeam) {
    //     console.log(`This is the team we are converting: ${trainerPokemonTeam}`)
    //     return trainerPokemonTeam.map(name => pokemonData[name]);
    // }

    const handlePickOption = (option) => {
        dispatch(pickOption(option));
    }


    const handleBackClick = () => {
        dispatch(setPokeOptionsState())
    }

    return (
        <div>
            <PokeBattleText/>
            {currentPhase === 'PokeOptionsState' && <PokeBattleOptions/>}
            {currentPhase === 'FightOptionsState' && <PokemonFight/>}
            {currentPhase === "PokeBagState" && <PokeBattleBag/>}
            {currentPhase === "PokeSwapState" && <PokeBattleSwap/>}
            {currentPhase === "PokeRunState" && <PokeBattleRun/>}
            {isDataLoaded === true && <DisplayPokemonInBattle/>}
            <div className={'go-back'}>
                <button onClick={handleBackClick}> Go Back</button>
            </div>
        </div>
    )
}

export default PokeBattleComponent;