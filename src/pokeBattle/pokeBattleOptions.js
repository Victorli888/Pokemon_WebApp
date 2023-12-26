import React, { useState, useEffect } from 'react';
import './pokeBattleOptions.css';
import '../index.css';
// import {gameTexts} from "./gameTexts";
import {updatePokemon} from "../redux/actions/pokemonActions"
import {useDispatch, useSelector} from "react-redux";
import PokeBattleFight from "./pokeBattleFight";
import PokeBattleBag from "./pokeBattleBag";
import PokeBattleSwap from "./pokeBattleSwap"
import PokeBattleRun from "./pokeBattleRun"
import PokeBag from "../pokeBag";
import {
    setFightOptionsState,
    setPokeBagState,
    setPokeOptionsState, setPokeRunState,
    setPokeSwapState,
} from "../redux/actions/StateActions";
import PokemonFight from "./pokeBattleFight";
import {showText} from "../redux/actions/pokeBattleActions";



const PokeBattleOptions = ({playerPokemonTeam, opponentPokemonTeam, stageType }) => {

    const pokemonState = useSelector(state => state.pokemon);
    const currentPhase = useSelector(state => state.battleState.currentPhase)
    const isTrainerBattle = useSelector(state => state.battleState.isTrainerBattle)
    // const [opponentPokemon, setOpponentPokemon] = useState(opponentPokemonTeam[0]);
    // const [playerPokemonData, setPlayerPokemonData] = useState(null);
    // const [opponentPokemonData, setOpponentPokemonData] = useState(null);
    const [isShowingDetailsBox, setIsShowingDetailsBox] = useState(true);
    // const [isShowingPokeBattleOptions, setIsShowingPokeBattleOptions] = useState(true);
    // const [isShowingFightOptions, setIsShowingFightOptions] = useState(false);
    // const [isShowingBagOptions, setIsShowingBagOptions] = useState(false);
    let [isBattleState, setIsBattleState] = useState(true);
    // const [showGameText, setShowGameText] = useState(null);
    // let [isGameOverState, setIsGameOverState] = useState(false);
    let [isRoundDone, setIsRoundDone] = useState(true);
    // let [continuePressed, setContinuePressed] = useState(false);
    const dispatch = useDispatch();
    const [selectedOption, setSelectedOption] = useState("")


    const handleFightClick = () => {
        setSelectedOption("FIGHT")
        dispatch(setFightOptionsState())

    };

    const handleBagClick = () => {
        setSelectedOption("BAG")
        dispatch(setPokeBagState())
    };

    const handlePokeSwapClick = () => {
        setSelectedOption("SWAP")
        dispatch(setPokeSwapState())
    };

    const handleRunClick = () => {
        console.log(`ATTEMPTING TO RUN: is this trainer Battle? ${isTrainerBattle}`)
        if (isTrainerBattle){
            dispatch(showText(["Can't run away from Trainer Battle!"]))

        }
        else{
            setSelectedOption("RUN")
            dispatch(setPokeRunState())
        }
    };

    const handleBackClick = () => {
        dispatch(setPokeOptionsState())
    }

    return (
        <div className={`pokeOptions-container`}>
            <div className={"pokeBattle-options"}>
                <button id={'top-left'} onClick={handleFightClick}>Fight</button>
                <button id={'top-right'} onClick={handleBagClick}>Bag</button>
                <button id={'bot-left'} onClick={handlePokeSwapClick}>Pokemon</button>
                <button id={'bot-right'} onClick={handleRunClick}>Run</button>
            </div>
        </div>

    );
};
export default PokeBattleOptions
