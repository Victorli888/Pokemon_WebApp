import React, { useState, useEffect } from 'react';
import imagePaths from "./imagePaths";
import './index.css';
import Pokedex from "./pokeDex";
import PokeBag from "./pokeBag";
import PlayerPoke from "./playerPoke";
import PokeBattle from "./pokeBattleView";
import { playerPokemonTeam, opponentPokemonTeam } from './gameData.js';
import {storyNodes} from './storyNodes'
import TalkingCharacter from "./characterAnimation";
import './characterAnimation.css'
import DisplayDialogue from "./displayDialogue";

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



    //TODO: fully implement preloading for urls
    // useEffect(() => {
    //     // Preload images in useEffect
    //     const imageUrls = textNodes.flatMap((node) =>
    //         typeof node.image === 'string' ? [node.image] : []
    //     );
    //
    //     function preloadImages() {
    //         for (const imageUrl of imageUrls) {
    //             const img = new Image();
    //             img.src = imageUrl;
    //         }
    //     }
    //
    //     preloadImages();
    // }, []);

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


    function toggleAppDetails() {
        setAppDetailsVisible(!appDetailsVisible);
    }
    //
    // function startBattle(playerPokemon, opponentPokemon) {
    //     setPokeBattleState({
    //         battleStarted: true,
    //         playerPokemon: playerPokemon,
    //         opponentPokemon: opponentPokemon,
    //     });
    // }
    //
    // function endBattle() {
    //     setPokeBattleState({
    //         battleStarted: false,
    //         playerPokemon: null,
    //         opponentPokemon: null,
    //     });
    // }

    return (
        <div>
            <div className="main-game">
                <div className={`game-image-container`}>
                    {currentStoryNode.id === "trainerBattleDale" ? ( // Start Wild Pokémon Battle

                        // TODO: Create a way to set new enemies and pokemon states for now hardcode
                        // <PokemonBattle
                        //     battleStarted={pokeBattleState.battleStarted}
                        //     playerPokemon={pokeBattleState.playerPokemon} // Pass the chosen player's Pokemon here
                        //     opponentPokemon={pokeBattleState.opponentPokemon} // Pass the opponent's Pokemon here
                        //     stageType={imagePaths.grassyBattleBG}
                        // />

                        <PokeBattle
                            playerPokemonTeam={playerPokemonTeam}
                            opponentPokemonTeam={opponentPokemonTeam}
                            stageType={imagePaths.grassyBattleBG}
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
                    <div className="cover-layer">
                        {/*Intentionally left blank*/}
                    </div>
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

