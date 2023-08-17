import React, { useState, useEffect } from 'react';
import './index.css';

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
                    // text: 'Continue',
                    // // requiredState: (currentState) => currentState.blueGoo,
                    // nextText: 12

                    text: 'Restart',
                    nextText: -1
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

        /// Create a Grass maze for Pokemon battles and catching Pokemon

        /// Grass loop
        {
            id: 12,
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
            id: 13,
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
    const [currentNode, setCurrentNode] = useState(textNodes[0]);



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
        setState({});
        showTextNode(1);
    }

    function showOption(option) {
        return option.requiredState == null || option.requiredState(state);
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
        setCurrentNode(currentNode);
    }

    useEffect(() => {
        console.log("starting game....")
        startGame();
    }, []);

    return (
        <div className="main-game">
            <div className="game-image-container">
                <img
                    src={
                        currentNode.image && typeof currentNode.image === 'string'
                            ? currentNode.image
                            : typeof currentNode.image === 'function'
                                ? currentNode.image(state)
                                : null
                    }
                    alt="Image"
                />
            </div>
            <p1 id="content">{currentNode.text}</p1>
            <div id="option-buttons">
                {currentNode.options &&
                    currentNode.options.map((option, index) => (
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
    );
}

export default MainGame;
