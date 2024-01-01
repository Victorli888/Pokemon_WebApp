import React, { useState, useEffect } from 'react';
import imagePaths from "./imagePaths";
import './index.css';
import Pokedex from "./pokeDex";
import PokeBag from "./pokeBag";
import PlayerPoke from "./playerPoke";
import PokeBattle from "./pokeBattleView";
// import {playerPokemonTeam} from './gamePokeTeams.js';
import {storyNodes} from './storyNodes'
import TalkingCharacter from "./characterAnimation";
import './characterAnimation.css'
import DisplayDialogue from "./displayDialogue";
import {pokemonBattles} from "./gamePokeBattles"
import { useSelector } from 'react-redux';
import PokemonBattle from "./pokeBattleView";
import DisplayPokemonInBattle from "./pokeBattle/displayPokemonInBattle";
import PokeBattleText from "./pokeBattle/PokeBattleText";
import pokeBattleOptions from "./pokeBattle/pokeBattleOptions";
import PokeBattleOptions from "./pokeBattle/pokeBattleOptions";
import {START_BATTLE} from "./redux/actionTypes/actionTypes";
import PokeBattleStart from "./pokeBattle/pokeBattleStart";

function MainGame() {
    const [state, setState] = useState();
    const [currentStoryNode, setCurrentStoryNode] = useState(storyNodes[0]);
    const [appDetailsVisible, setAppDetailsVisible] = useState(false);
    const [showPlayerUtility, setShowPlayerUtility] = useState(false);
    const [showPokeDex, setShowPokeDex] = useState(false);
    const [showPokeBag,setShowPokeBag] = useState(false);
    const [showPlayerPokemon, setShowPlayerPokemon] = useState(false);
    const [pokeBattleState, setPokeBattleState] = useState({
        isInBattle: false, // Initialize battleStarted state
        opponentPokemon: null,
        playerPokemon: null
    });
    const [resetDialogue, setResetDialogue] = useState(false);
    const pokemonTeams = useSelector(state => state.teams)
    const pokemonData = useSelector(state => state.pokemon)

    function convertToPokemonObjects(trainerPokemonTeam) {
        console.log(`This is the team we are converting: ${trainerPokemonTeam}`)
        return trainerPokemonTeam.map(name => pokemonData[name]);
    }

    function startGame() {
        console.log("STARTING GAME!")
        setState({});
        showTextNode(1);
    }

    function selectOption(option) {
        const nextTextNodeId = option.nextText;
        if (nextTextNodeId <= 0) {
            setResetDialogue(true)
            return startGame();
        }
        setResetDialogue(true)
        setState((prevState) => ({ ...prevState, ...option.setState }));
        showTextNode(nextTextNodeId);
    }

    function showTextNode(textNodeIndex) {
        const currentNode = storyNodes.find((node) => node.id === textNodeIndex);
        setCurrentStoryNode(currentNode);
    }

    return (
        <div>
            <div className="main-game">
                <div className={`game-image-container`}>
                    {currentStoryNode.id in pokemonTeams ? (
                        // <PokeBattle
                        //     playerPokemonTeam={convertToPokemonObjects(pokemonTeams.Player)}
                        //     opponentPokemonTeam={convertToPokemonObjects(pokemonTeams[currentStoryNode.id])}
                        //     stageType={pokemonBattles[currentStoryNode.id].stageType}
                        //     isTrainerBattle={true}
                        //     />
                        <PokeBattleStart
                            opponent= {currentStoryNode.id}
                            stage={pokemonBattles[currentStoryNode.id].stageType}
                            isTrainerBattle={true}
                            />
                    ) : (
                        // Not pokeBattle continue story images
                        <div className="story-container">
                            <img
                                src={
                                    currentStoryNode.image && typeof currentStoryNode.image === 'string'
                                        ? currentStoryNode.image
                                        : typeof currentStoryNode.image === 'function'
                                            ? currentStoryNode.image(state)
                                            : null
                                }
                                alt="Image"
                            />
                            <TalkingCharacter
                                id='left-char'
                                characterImg={currentStoryNode.left_char}
                            />
                            <TalkingCharacter
                                id='center-char'
                                characterImg={currentStoryNode.center_char}
                            />
                            <TalkingCharacter
                                id='right-char'
                                characterImg={currentStoryNode.right_char}
                            />
                            <DisplayDialogue
                                dialogue={currentStoryNode.text}
                                resetDialogue={resetDialogue}
                            />
                        </div>

                    )}
                </div>
                <div id="option-buttons">
                    {currentStoryNode.options &&
                        currentStoryNode.options.map((option, index) => (
                            <button
                                key={index}
                                className="btn"
                                onClick={() => selectOption(option)}
                            >
                                {option.text}
                            </button>
                        ))}
                </div>
            <div
                className={`player-utility-panel ${showPlayerUtility ? 'open' : ''}`}
                onMouseEnter={() => setShowPlayerUtility(true)}
                onMouseLeave={() => setShowPlayerUtility(false)}
            >
                <button className={'btn pokedex-open'} onClick={() => setShowPokeDex((prev) => !prev)}>
                    {showPokeDex ? 'Close Pokédex' : 'Open Pokédex'}
                </button>
                <button className={'btn pokebag-open'} onClick={() =>setShowPokeBag((prev)=>!prev)}>
                    {showPokeBag ? 'Close PokeBag' : `Open PokeBag`}
                </button>
                <button className={'btn playerPokemon-open'} onClick={()=>setShowPlayerPokemon((prev)=>!prev)}>
                    {showPlayerPokemon ? 'Hide Pokemon': 'View Pokemon'}
                </button>

            </div>
            <div className={`pokeUtilities-container ${showPokeDex ? 'open' : ''}`}>
                {showPokeDex && <Pokedex />}
            </div>
            <div className={`pokeUtilities-container ${showPokeBag ? 'open' : ''}`}>
                {showPokeBag && <PokeBag/>}
            </div>
            <div className={`pokeUtilities-container ${showPlayerPokemon ? 'open' : ''}`}>
                {showPlayerPokemon && <PlayerPoke/>}
            </div>
            </div>
        </div>
    );
    }
export default MainGame;

