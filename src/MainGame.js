import React, { useState, useEffect } from 'react';
import githubLogo from './media/github-mark/github-mark-white.png';
import './index.css';
import Pokedex from "./pokeDex";
import PokeBag from "./pokeBag";

function MainGame() {
    const textNodes = [
        {
            id: 1,
            image: "https://images.nintendolife.com/b68906ba7eaa5/1280x720.jpg",
            text: "            Zzz... Hm? Wha...? You hear a loud buzzing and wake up to check the time. " +
                "What time is it? What? 9:30?! Why didn't anyone wake me up! I'm late! I've got to get to the Pokemon Lab " +
                "before all the good starter pokemon are taken!"
            ,options: [
                {
                    text: 'Next',
                    setState: { blueGoo: true },
                    nextText: 2
                },
            ]
        },
        {
            id: 2,
            image: "https://3.bp.blogspot.com/-8OBE7UfGie8/U9KGHYE2JzI/AAAAAAAABuw/za0_UzzM6xY/s1600/Prof_Juniper_Lab_anime.png",
            text: "As you make your way out of your house you run to the outskirts of the town and make your way to Professor Oak's Lab, you can see it off in the distance"
            ,options: [
                {
                    text: 'Next',
                    setState: { blueGoo: true },
                    nextText: 3
                },
            ]
        },
        {
            id: 3,
            image: "https://d1lss44hh2trtw.cloudfront.net/assets/editorial/2018/11/profoakbig.jpg",
            text: "You must be Ash! I'm glad you made it! Welcome to the world of Pokemon! I'm excited to introduce you to" +
                " to the world of Pokemon. Obviously my name isn't professor, call me Oak instead! ",
            options: [
                {
                    text: 'Next',
                    setState: { blueGoo: true },
                    nextText: 4
                },
            ]
        },
        {
            id: 4,
            image: "https://wallpapercave.com/wp/wp11370606.jpg"
            ,
            text: ' This world is inhabited by creatures that we call pokemon.\n' +
                '            People and pokemon live together by supporting each other.\n' +
                '            Some people play with pokemon, some battle with them.\n' +
                '\n' +
                '            But we don\'t know everything about pokemon yet. There are still\n' +
                '            many mysteries to solve. That\'s why I study pokemon every day.',
            options: [
                {
                    text: 'Next',
                    requiredState: (currentState) => currentState.blueGoo,
                    setState: { blueGoo: false, sword: true },
                    nextText: 5
                }
            ]
        },
        {
            id: 5,
            image: "https://attackofthefanboy.com/wp-content/uploads/2021/07/Pokemon-GO-How-To-Get-More-Poke-Balls-Before-GO-Fest-2021.jpg",
            text: 'But Enough about me! you came to embark on your adventure now which pokemon will you choose',
            options: [
                {
                    text: 'Cyndiquil the Fire type',
                    nextText: 6
                },
                {
                    text: 'Chikorita the Grass type',
                    nextText: 7
                },
                {
                    text: 'Totodile the Water type',
                    nextText: 8
                }
            ]
        },
        {
            id: 6,
            image: "https://i.imgur.com/S8NmENZ.png",
            text: '\n' +
                'Cyndaquil is a fiery Pokémon known for its intense personality and fiercely loyal nature. This spiky Fire-type creature adds a touch of tsundere flair to its character. At first glance, Cyndaquil may come across as aloof and distant, but beneath its prickly exterior lies a deeply caring and devoted heart.\n' +
                '\n' +
                'With flames flickering on its back, Cyndaquil embodies the passion and determination that fuel its actions. It possesses an inner fire that drives it to overcome any challenge it faces. When faced with adversity, Cyndaquil\'s fiery spirit ignites, transforming it into a formidable force to be reckoned with..',
            options: [
                {
                    text: 'Look Again...',
                    nextText: 5
                },
                {
                    text: "Pick Cyndaquil!",
                    nextText: 11
                }
            ]
        },
        {
            id: 7,
            image: "https://archives.bulbagarden.net/media/upload/d/dc/Lyra_Chikorita.png",
            text: 'Chikorita, the Grass-type Pokémon, possesses a gentle and shy nature that adds a touch of sweetness and innocence to its character. With its timid demeanor and endearing charm, Chikorita captures the hearts of trainers and admirers alike.',
            options: [
                {
                    text: 'Look Again...',
                    nextText: 5
                },
                {
                    text: "Pick Chikorita!",
                    nextText: 10
                }
            ]
        },
        {
            id:8,
            image: "https://external-preview.redd.it/kXRKjhwiRrbbPnZv0NXVH2SW-DaOuaXh8iTd0BcK3Rc.jpg?auto=webp&s=65931a6d348ead7f684128c6a3b6867880f19bb1",
            text:"Totodile is a laid-back and easygoing Pokémon that effortlessly flows with the tides. As a Water-type creature, it embodies a sense of tranquility and adaptability, adapting to various situations with remarkable ease. Totodile's calm demeanor and go-with-the-flow attitude make it a refreshing presence in any environment.",
            options: [
                {
                    text: 'Look Again...',
                    nextText: 5
                }
                ,{
                    text: "Pick Totodile!",
                    nextText: 9

                }
            ]
        },
        {
            id: 9,
            image: "https://assets.mubicdn.net/images/film/165323/image-w1280.jpg?1486530680",
            text: 'you picked Totodile! From here on out this pokemon will be your partner on your journey! ',
            options: [
                {
                    text: 'Restart',
                    nextText: -1
                },
                {
                    text: 'Continue...',
                    nextText: "pokeDex-acquired"
                }
            ]
        },
        {
            id: 10,
            image: "https://i.ytimg.com/vi/t4Ztsxubbrs/maxresdefault.jpg",
            text: 'you picked Chikorita! From here on out this pokemon will be your partner on your journey!',
            options: [
                {
                    text: 'Restart',
                    nextText: -1
                },
                {
                    text: 'Continue...',
                    nextText: "pokeDex-acquired"
                }
            ]
        },

        {
            id: 11,
            image: "https://pbs.twimg.com/media/E_PbwkCWEAwhTLn.jpg:large",
            text: 'you picked Cyndaquil! From here on out this pokemon will be your partner on your journey!',
            options: [
                {
                    text: 'Restart',
                    nextText: -1
                },
                {
                    text: 'Continue...',
                    nextText: "pokeDex-acquired"
                }
            ]
        },
        {
            //TODO: Create lock for PokeDex up until this point, ping a notification that Pokedex is unlocked
            id: "pokeDex-acquired",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWHVUxJitukcWUmzKy2VhCimz4Bg1DLfHjug&usqp=CAU",
            text: `Oh and before you go, I want you to have this.... It's a pokeDex it contains data for all the known pokemon we've discovered so far.
            ... Oh and also be careful out there.`,
            options: [
                {
                    text: 'Continue...',
                    nextText: -1
                }
            ]
        },

        {
            id: 123,
            image: "https://pbs.twimg.com/media/E_PbwkCWEAwhTLn.jpg:large",
            text: 'You find yourself in some tall grass where should you go next?',
            options: [
                {
                    text: 'Restart',
                    nextText: -1
                }
            ]
        },

        /// TODO: Create a Grass maze for Pokemon battles and catching Pokemon

        /// Grass loop
        {
            id: 120,
            image: "https://www.nintendo.com/sg/switch/aw7k/img/screenshot01.png",
            text: 'You find yourself in tall grass where would you like to go from here?',
            options: [
                {
                    text: "Battle",
                    nextText: 13,
                },
                {
                    text: "Go Left",
                    nextText: 14
                },
                {
                    text: "Go Right",
                    nextText: 15
                }
            ]
        },
        {
            id: 130,
            image: "https://cdn.wallpapersafari.com/30/6/a4mrs3.png",
            text: 'You find yourself in some tall grass where should you go next?',
            options: [
                {
                    text: 'Restart',
                    nextText: -1
                }
            ]
        }
    ]
    const [state, setState] = useState();
    const [currentStoryNode, setCurrentStoryNode] = useState(textNodes[0]);
    const [appDetailsVisible, setAppDetailsVisible] = useState(false);
    const [showPlayerUtility, setShowPlayerUtility] = useState(false);
    const [showPokeDex, setShowPokeDex] = useState(false);
    const [showPokeBag,setShowPokeBag] = useState(false);



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
        const currentNode = textNodes.find((node) => node.id === textNodeIndex);
        setCurrentStoryNode(currentNode);
    }


    function toggleAppDetails() {
        setAppDetailsVisible(!appDetailsVisible);
    }

    return (
        <div>
            <div className="main-game">
                <div className={`game-image-container ${showPokeDex ? 'hidden': ''}"}`}>
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

            </div>
            <div className={`pokeUtilities-container ${showPokeDex ? 'open' : ''}`}>
                {showPokeDex && <Pokedex />}
            </div>
            <div className={`pokeUtilities-container ${showPokeBag ? 'open' : ''}`}>
                {showPokeBag && <PokeBag/>}
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
                                    src={githubLogo}
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
    );
}

export default MainGame;
