import React, { useState, useEffect } from 'react';
import imagePaths from "./imagePaths";
import './index.css';
import Pokedex from "./pokeDex";
import PokeBag from "./pokeBag";
import PlayerPoke from "./playerPoke";
import PokeBattle from "./pokeBattleView";
import { playerPokemonTeam, opponentPokemonTeam } from './gameData.js';
import {storyNodes} from './storyNodes'






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
            return startGame();
        }
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
                    )}
                    <div className="cover-layer">
                        {/*Intentionally left blank*/}
                    </div>
                </div>

                <p1 id="content">{currentStoryNode.text}</p1>
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
            <div className= "details-toggle-btn-container">
                <div>
                    <button className={"details-toggle-btn"} onClick={toggleAppDetails}> Show Details </button>
                </div>
            </div>
            <div className={`app-details ${appDetailsVisible ? 'visible' : 'hidden'}`}>
                <section id="one" className="wrapper style2 special">
                    <header className="major">
                        <h2 id="details-header">
                            <div className="github-link-container">
                            <a
                                href="https://github.com/Victorli888/Pokemon_WebApp"
                                className="github-link"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src={imagePaths.githubLogo}
                                    alt="See on GitHub"
                                    className="github-logo"
                                />
                                See on GitHub
                            </a>
                        </div>
                        </h2>

                        <p1>
                            Embark on a nostalgic text-based adventure reminiscent of a cherished childhood classic. Immerse
                            yourself in
                            a captivating journey shaped by your decisions. Choose your path, make meaningful choices, and
                            experience the excitement of a dynamic storyline.
                        </p1>
                        <p1>
                            In "Pokemon Text and Adventure," you'll encounter a world filled with iconic characters, challenging
                            puzzles, and captivating narratives. Engage in exciting battles, capture Pokemon, and unravel
                            mysteries as you progress through the game.
                        </p1>
                        <p1>
                            Features:
                        </p1>
                        <ul>
                            <li>Choose Your Adventure: Make choices that impact the storyline and shape your character's
                                journey.
                            </li>
                            <li>Captivating Narrative: Immerse yourself in a rich and engaging storyline filled with twists and
                                turns.
                            </li>
                            <li>Dynamic Gameplay: Engage in Pokemon battles, solve puzzles, and interact with memorable
                                characters.
                            </li>
                            <li>Nostalgic Experience: Relive the excitement of a classic text adventure with a Pokemon twist.
                            </li>
                            <li>Responsive Design: Enjoy a seamless experience on various devices, from desktop to mobile.</li>
                        </ul>
                    </header>
                </section>
            </div>
            </div>
        </div>
    );
    }
export default MainGame;

