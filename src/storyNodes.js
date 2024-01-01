import imagePaths from "./imagePaths";
import {gameTexts} from "./gameTexts";
import pokeDex from "./pokeDex";

export const storyNodes = [
    {
        id: 1,
        image: imagePaths.bedroomBG,
        left_char: imagePaths.ashe,
        text: [`Zzz... Hm? Wha...?`, `You hear a loud buzzing and wake up to check the time.`,
            `What time is it? What? 10:30?! Why didn't anyone wake me up! I'm late! I've got to get to the Pokemon Lab before its too late!`]
        ,options: [
            {
                text: 'Next',
                nextText: 'pokeTrainerDale'
            },
        ]
    },
    {
        id: 2,
        image: imagePaths.pokeLabExteriorBG,
        text: [
            "You run down the stairs skipping breakfast and step out the door, a sense of urgency fills the air.",
            "The morning sun casts long shadows, and you realize you're running late.",
            "With a burst of energy, you sprint towards the outskirts of the town, where Professor Oak's Lab awaits."
        ]

        ,options: [
            {
                text: 'Next',
                nextText: 3
            },
        ]
    },
    {
        id: 3,
        image: imagePaths.pokeLabInteriorBG,
        left_char: imagePaths.ashe,
        right_char: imagePaths.proffesorOak,
        text: [
            "Ah, you must be Ash! I'm delighted you made it!",
            "Welcome to the fascinating world of Pokémon!",
            "I'm thrilled to be your guide in this exciting journey.",
            "By the way, don't bother with the formal 'Professor'; just call me Oak!"
        ]
        ,
        options: [
            {
                text: 'Next',
                nextText: 4
            },
        ]
    },
    {
        id: 4,
        image: imagePaths.pokeWorldMap,
        left_char: imagePaths.proffesorOak
        ,
        text: [
            "In this world, fascinating creatures known as Pokémon inhabit every corner.",
            "Here, people and Pokémon coexist, forming a bond of mutual support.",
            "However, our understanding of Pokémon is far from complete.",
            "Numerous mysteries surround them, waiting to be unraveled.",
            "That's precisely why I dedicate myself to the study of Pokémon each and every day."
        ]
        ,
        options: [
            {
                text: 'Next',
                nextText: 5
            }
        ]
    },
    {
        id: 5,
        image: imagePaths.pokeStartersBG,
        text: ['But Enough about me!', 'you came to embark on your adventure now which pokemon will you choose?'],
        options: [
            {
                text: 'Bulbasaur the Grass type',
                nextText: 7
            },
            {
                text: 'Charmander the Fire type',
                nextText: 6
            },
            {
                text: 'Squirtle the Water type',
                nextText: 8
            }
        ]
    },
    {
        id: 6,
        image: imagePaths.selectCharmander,
        text:[
            "Charmander is a fiery Pokémon known for its intense personality and fiercely loyal nature. This spiky Fire-type creature adds a touch of tsundere flair to its character. At first glance, Charmander may come across as aloof and distant, but beneath its prickly exterior lies a deeply caring and devoted heart.",
            "With flames flickering on its back, Charmander embodies the passion and determination that fuel its actions. It possesses an inner fire that drives it to overcome any challenge it faces. When faced with adversity, Charmander's fiery spirit ignites, transforming it into a formidable force to be reckoned with."
        ]
        ,
        options: [
            {
                text: 'Look Again...',
                nextText: 5
            },
            {
                text: "Pick Charmander!",
                nextText: 11
            }
        ]
    },
    {
        id: 7,
        image: imagePaths.selectBulbasaur,
        text: [
            "Bulbasaur, the Grass-type Pokémon, possesses a gentle and shy nature, adding a touch of sweetness and innocence to its character.",
            "With its timid demeanor and endearing charm, Bulbasaur captures the hearts of trainers and admirers alike."
        ]
        ,
        options: [
            {
                text: 'Look Again...',
                nextText: 5
            },
            {
                text: "Pick Bulbasaur!",
                nextText: 10
            }
        ]
    },
    {
        id:8,
        image: imagePaths.selectSquirtle,
        text:[
            "Squirtle is a laid-back and easygoing Pokémon that effortlessly flows with the tides.",
            "As a Water-type creature, it embodies a sense of tranquility and adaptability, adapting to various situations with remarkable ease. Squirtle's calm demeanor and go-with-the-flow attitude make it a refreshing presence in any environment."
        ]
        ,
        options: [
            {
                text: 'Look Again...',
                nextText: 5
            }
            ,{
                text: "Pick Squirtle!",
                nextText: 9

            }
        ]
    },
    {
        id: 9,
        image: imagePaths.squirtleAquired,
        text: [
            "You've chosen Squirtle! This Pokémon will be your companion on your journey!"
        ],
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
        image: imagePaths.bulbasaurAquired,
        text: [
            "You've chosen Bulbasaur! This Pokémon will be your companion on your journey!"
        ],
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
        image: imagePaths.charmanderAquired,
        text: [
            "You've chosen Charmander! This Pokémon will be your companion on your journey!"
        ],
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
        image: imagePaths.pokeLabInteriorBG,
        left_char: imagePaths.ashe,
        center_char: imagePaths.pokeDex,
        right_char: imagePaths.proffesorOak,
        text: [
            "Oh, before you go, take this...","It's a Pokédex containing data on all the known Pokémon we've discovered.",
            "The closest city is Pewter City. Why not start heading there?"
        ]
        ,
        options: [
            {
                text: 'Continue...',
                nextText: 'palletTown'
            }
        ]
    },
    {
        id: `palletTown`,
        image: imagePaths.palletTownBG,
        text: [`You exit Oak's Pokelab, where do you want to head to first?`],
        options: [
            {
                text: `Oak's PokeLab`,
                nextText:`lab`
            },
            {
                text: 'Go to Route 3 to Pewter City',
                nextText: "route3"
            },
            {
                text: `Your House`,
                nextText: `home`
            }
            ,
            {
                text: `The South Side Pier`,
                nextText: `Pier`
            }
        ]
    },
    {
        id: `Pier`,
        image: imagePaths.pierBG,
        right_char: imagePaths.ashe,
        text: [
            "You come across a picturesque pier with seagulls soaring in the distance, and the sun beaming down, casting a warm glow over the scene."
        ]
        ,
        options: [
            {
                text: "Enough Sun bathing, I should get going.",
                nextText: `palletTown`
            }
        ]
    },
    {
        id: `home`,
        image: imagePaths.homeBG,
        right_char: imagePaths.ashe,
        text: [
            "Returning home, you step inside and find yourself on the couch, enveloped in a comforting embrace as coziness washes over you."
        ]
        ,
        options: [
            {
                text: [
                    "Time to get off your lazy butt."
                ]
                ,
                nextText: `palletTown`
            }
        ]
    },
    {
        id: `route3`,
        image: imagePaths.routeThreeBG,
        text: [
            "While walking on Route 3, you spot some rustling in the tall grass."
        ]
        ,
        options: [
            {
                text: `check it out`,
                nextText:`trainerDaleIntro`
            },
            {
                text: 'ignore it',
                nextText: `trainerDaleIntro`
            }
        ]
    },
    {
        id: `lab`,
        image: imagePaths.pokeLabInteriorBG,
        left_char: imagePaths.ashe,
        right_char: imagePaths.proffesorOak,
        text: [
            "Oh, Ash! You're back so fast. Did you forget something?"
        ]
        ,
        options: [
            {
                text: `Ask him whats in Pewter City`,
                nextText:`oakDialog`
            },
            {
                text: 'Tell him no, and then leave',
                nextText: `palletTown`
            }
        ]
    },
    {
        id: `oakDialog`,
        left_char: imagePaths.ashe,
        right_char: imagePaths.proffesorOak,
        image: imagePaths.pokeLabInteriorBG,
        text: [
            "Pewter City is home to the Rock Type Gym, led by Gym Leader Brock.",
            "Defeating him and earning the Pewter City Gym Badge will be a major milestone in your Pokemon adventure."
        ]
        ,
        options: [
            {
                text: `Then I better get going!`,
                nextText:`route3`
            },
            {
                text:  `Thanks I still have other things to check out before going`,
                nextText: `palletTown`
            }
        ]
    },
    {
        id: `trainerDaleIntro`,
        image: imagePaths.tallGrassBG,
        left_char: imagePaths.ashe,
        right_char: imagePaths.trainerDale,
        text: [`A Pokemon trainer with pops out the grass!`,
            `Trainer Dale says " Oh hey there! I'm trying catch pokemon but I need more practice battling!"`
        ],
        options: [
            {
                text: `StartBattle`,
                nextText:`pokeTrainerDale`
            }
        ]
    },
    {
        id: `pokeTrainerDale`,
        image: imagePaths.tallGrassBG,
        options: [
            {
                text: `Skip Battle.`,
                nextText:`splitPath`
            }
        ]
    },
    {
        id: `splitPath`,
        image: imagePaths.routeThreeSplitBG,
        text: [
            "As you walk on Route 3, a decision awaits you: Do you take the path less traveled or continue on Route 3?"
        ]
        ,
        options: [
            {
                text: `continue on route 3`,
                nextText:`pewterCity`
            },
            {
                text: `take the path less traveled on`,
                nextText: `grassMaze_0`
            }
        ]
    },
    {
        id: `grassMaze_0`,
        image: imagePaths.tallGrassBG,
        text: [
            "You enter the tall grass, and you're determined to find your way to Pewter City."
        ]
        ,
        options: [
            {
                text: `Go Left`,
                nextText: `grassMaze_1`
            },
            {
                text: `Take a Right`,
                nextText: `grassMaze_2`
            }
        ]
    },
    {
        id: `grassMaze_1`,
        image: imagePaths.tallGrassFlippedBG,
        text: [`You continue through the tall grass, the path seems winding and uncertain.`],
        options: [
            {
                text: `Go Left`,
                nextText: `grassMaze_3`
            },
            {
                text: `Take a Right`,
                nextText: `grassMaze_4`
            },
            {
                text: `Go Back`,
                nextText: `grassMaze_0`
            }
        ]
    },
    {
        id: `grassMaze_2`,
        image: imagePaths.tallGrassBG,
        text: [`You push forward, trying to make sense of the twisting paths.`],
        options: [
            {
                text: `Go Left`,
                nextText: `grassMaze_3`
            },
            {
                text: `Take a Right`,
                nextText: `grassMaze_1`
            },
            {
                text: `Go Back`,
                nextText: `grassMaze_5`
            }
        ]
    },
    {
        id: `grassMaze_3`,
        image: imagePaths.tallGrassFlippedBG,
        text: [`You forge ahead through the tall grass, hoping you're getting closer to your destination.`],
        options: [
            {
                text: `Go Left`,
                nextText: `grassMaze_1`
            },
            {
                text: `Take a Right`,
                nextText: `grassMaze_2`
            }
        ]
    },
    {
        id: `grassMaze_4`,
        image: imagePaths.tallGrassFlippedBG,
        text: [`You make a turn, unsure if it's the right way, but you have to keep going.`],
        options: [
            {
                text: `Go Left`,
                nextText: `grassMaze_0`
            },
            {
                text: `Take a Right`,
                nextText: `grassMaze_2`
            }
        ]
    },
    {
        id: `grassMaze_5`,
        image: imagePaths.tallGrassBG,
        text: [`You retrace your steps and try to find a new path in the tall grass.`],
        options: [
            {
                text: `Go Left`,
                nextText: `grassMaze_2`
            },
            {
                text: `Take a Right`,
                nextText: `grassMaze_3`
            },
            {
                text: `Go straight`,
                nextText: `grassMazeFinish`
            }
        ]
    },
    {
        id: `grassMazeFinish`,
        image: imagePaths.pewterCityOutskirtsBG,
        text: [`Congratulations! You emerge from the tall grass and finally reach Pewter City.`,
            `Your journey through the maze is over.`
        ],
        options: [
            {
                text: `Continue towards Pewter City`,
                nextText: `pewterCity`  // You can replace this with the next story node after reaching Pewter City.
            },
            {
                text: `Go back into the maze`,
                nextText: `grassMaze_0`  // You can replace this with the next story node after reaching Pewter City.
            }
        ]
    },
    {
        id: `pewterCity`,
        image: imagePaths.pewterCityBG,
        text: [`As you make your way through Pewter City you observe that it's a small quaint town with some notable sights to visit `],
        options: [
            {
                text: `Go to the Pewter City Gym`,
                nextText:`pewterCityGym`
            },
            {
                text: 'Enter the Abandoned house',
                nextText: "abandonedHouse"
            },
            {
                text: `You see an old man rocking in his chair`,
                nextText: `strangeOldMan0`
            }
            ,
            {
                text: `fancy house at the end of the path `,
                nextText: `fancyHouse`
            }
        ]
    },
    {
        id: `abandonedHouse`,
        image: imagePaths.abandonedHouseBG,
        left_char: imagePaths.ashe,
        text: [
            "You enter the abandoned house and you see an empty living room with rotting floorboards,",
            "and in the corner of the house you see a tattered old wicker basket"
        ],
        options: [
            {
                text: `Check it out `,
                nextText: `wickerBasket`  // You can replace this with the next story node after reaching Pewter City.
            },
            {
                text: `Leave`,
                nextText: `pewterCity`
            }
        ]
    },
    {
        id: `wickerBasket`,
        image: imagePaths.abandonedHouseBG,
        text: [
            "As you cautiously approach the ominous basket, your mind races with dark possibilities lurking within.",
            "With each step, the anticipation builds, conjuring vivid images of potential horrors concealed within its confines.",
            "As you finally cast your gaze upon it, a shiver runs down your spine, only to reveal... nothing."
        ],
        options: [
            {
                text: `You don't know what you expected `,
                nextText: `pewterCity`  // You can replace this with the next story node after reaching Pewter City.
            }
        ]
    },
    {
        id: `fancyHouse`,
        image: imagePaths.pokeMansionBG,
        text:
            [
                "You find yourself drawn towards an exquisite home, constructed with precision from chiseled stone bricks.",
                "The intricate details and masterful craftsmanship evoke a sense of awe, capturing your admiration as you approach."
            ],
        options: [
            {
                text: `Open the Door `,
                nextText: `fancyHouseDoor`  // You can replace this with the next story node after reaching Pewter City.
            },
            {
                text: `Turn around.`,
                nextText: `pewterCity`
            }
        ]
    },
    {
        id: `fancyHouseDoor`,
        image: imagePaths.pokeMansionBG,
        left_char: imagePaths.ashe,
        text: [`I probably shouldn't barge into someone's house uninvited.`],
        options: [
            {
                text: `Leave`,
                nextText: `pewterCity`
            }
        ]
    },
    {
        id: `strangeOldMan0`,
        image: imagePaths.pewterCityBG,
        text: [
            "You catch the attention of an elderly figure who addresses you warmly.",
            "Hello There!",
            "You appear to be a quite promising Pokémon trainer. Would you care humoring this old man?",
            ],
        options: [
            {
                text: `Maybe Later...`,
                nextText:`pewterCity`
            },
            {
                text: 'Sorry, No.',
                nextText: "pewterCity"
            },
            {
                text: `I do have some time to kill.`,
                nextText: `strangeOldMan1`
            }
        ]
    },
    {
        id: `strangeOldMan1`,
        image: imagePaths.pewterCityBG,
        left_char: imagePaths.ashe,
        right_char: imagePaths.oldMan,
        text: [`I used to be a pokemon trainer just like you! let me ask you what do you think of your pokemon?`],
        options: [
            {
                text: `They're life long companions!`,
                nextText:`strangeOldMan2`
            },
            {
                text: 'Tools to become the best.',
                nextText: "strangeOldManFailed"
            },
            {
                text: `I've never really thought much about it.`,
                nextText: `strangeOldManFailed`
            }
        ]
    },
    {
        id: `strangeOldMan2`,
        image: imagePaths.pewterCityBG,
        left_char: imagePaths.ashe,
        right_char: imagePaths.oldMan,
        text: [`Ah, you have a great bond with your Pokémon! That's wonderful to hear.`,
            `Let me test your qualities as a trainer.`,
            `Imagine you encounter a lost and injured Pokémon in the wild. What would you do?`],
        options: [
            {
                text: `I would approach it gently and try to help.`,
                nextText: `strangeOldMan3`
            },
            {
                text: `I'm not sure.`,
                nextText: `strangeOldManFailed`
            },
            {
                text: `I'd ignore it and continue my journey.`,
                nextText: `strangeOldManFailed`
            }
        ]
    },
    {
        id: `strangeOldMan3`,
        image: imagePaths.pewterCityBG,
        left_char: imagePaths.ashe,
        right_char: imagePaths.oldMan,
        text: [`Never forget this unshakable virtue you have!`,
            `Here's another scenario: You come across a Pokémon being mistreated by its trainer. How would you react?`],
        options: [
            {
                text: `I would intervene and stand up for the Pokémon.`,
                nextText: `strangeOldMan4`
            },
            {
                text: `I'm not sure.`,
                nextText: `strangeOldManFailed`
            },
            {
                text: `I'd mind my own business and move on.`,
                nextText: `strangeOldManFailed`
            }
        ]
    },
    {
        id: `strangeOldMan4`,
        image: imagePaths.grassyBattleBG,
        left_char: imagePaths.ashe,
        right_char: imagePaths.oldMan,
        text: [`Impressive, you're a kind-hearted trainer!`,
            `One more question: You find a hurt and abandoned Pokémon that doesn't belong to you. What do you do?`],
        options: [
            {
                text: `I would take it in, care for it, and try to find its owner.`,
                nextText: `strangeOldManSuccess`
            },
            {
                text: `I'm not sure about this one.`,
                nextText: `strangeOldManFailed`
            },
            {
                text: `I'd leave it and continue my journey.`,
                nextText: `strangeOldManFailed`
            }
        ]
    },
    {
        id: `strangeOldManSuccess`,
        image: imagePaths.pewterCityBG,
        left_char: imagePaths.ashe,
        right_char: imagePaths.oldMan,
        text: [`You're type of trainer I've been looking for!`,
            `Your compassion and empathy for Pokémon is truly remarkable.`,
            `My adventure has ended but he has so much to learn still.`,
            `The old man holds out pikachu with what looks like a mildly annoyed face`,
            `as a token of your compassionate nature. Will you accept this Pokémon?`],
        options: [
            {
                text: `Accept the Pokéball!`,
                nextText: `pewterCity`
            },
            {
                text: "I really can't accept such a gift.",
                nextText: `pewterCity`
            }
        ]
    },
    {
        id: `strangeOldManFailed`,
        image: imagePaths.grassyBattleBG,
        left_char: imagePaths.ashe,
        right_char: imagePaths.oldMan,
        text: [`Oh, it seems like you're still learning how to be a compassionate trainer.`,
            `Don't worry, we all start somewhere. Feel free to come back if you have more questions or want to learn. Good luck on your journey as a Pokémon trainer!`],
        options: [
            {
                text: `Maybe next time.`,
                nextText: `pewterCity`
            }
        ]
    },
    {
        id: `pewterCityGym`,
        image: imagePaths.pewterCityGymBG,
        left_char: imagePaths.ashe,
        text: [
            "Entering the Pewter City Gym, you immediately sense the aura of rock-type Pokémon that inhabit the space.",
            "The gym's interior is dimly lit, creating an atmosphere of challenge and anticipation.",
            "Rocky terrain stretches across the floor, setting the stage for battles against sturdy opponents.",
            "Your attention is drawn to two trainers, poised and prepared for a Pokémon battle."
        ],
        options: [
            {
                text: `Challenge the first trainer.`,
                nextText: `pewterCityGymTrainerMark`
            },
            {
                text: `Leave the gym for now.`,
                nextText: `pewterCity`
            }
        ]
    },
    {
        id: `pewterCityGymTrainerMark`,
        image: imagePaths.pewterCityGymBG,
        left_char: imagePaths.ashe,
        text: [
            "Hey I was here first!",
            "If you want to battle Brock you're going to have to go through me first"
        ],
        options: [
            {
                text: `Challenge the first trainer.`,
                nextText: `gymTrainerMark`
            },
            {
                text: `Leave the gym for now.`,
                nextText: `pewterCity`
            }
        ]
    },
    {
        id: `gymTrainerMark`,
        image: imagePaths.tallGrassBG,
        options: [
            {
                text: `Skip Battle.`,
                nextText:`pewterCityGymTrainerMarkResult`
            }
        ]
    },
    {
        id: `pewterCityGymTrainerMarkResult`,
        image: imagePaths.pewterCityGymBG,
        left_char: imagePaths.ashe,
        right_char: imagePaths.trainerMark,
        text: [
            "A heated battle ensues between your Pokemon and the trainer's.",
            "The clash of powerful moves fills the air, creating an intense atmosphere.",
            "Against all odds, your skills prevail, and you emerge as the victorious trainer.",
            "The defeated trainer graciously acknowledges your triumph with a respectful nod."
        ],
        options: [
            {
                text: `Challenge the second trainer.`,
                nextText: `pewterCityGymTrainerLocke`
            }
        ]
    },
    {
        id: `pewterCityGymTrainerLocke`,
        image: imagePaths.pewterCityGymBG,
        left_char: imagePaths.ashe,
        right_char: imagePaths.trainerLocke,
        text: [
            "Locke: Oh ho ho ho, You're looking to obtain the Pewter City Badge from Brock?",
            "Lets see if you even got what it takes to beat me first."
        ],
        options: [
            {
                text: `Battle with trainer Locke`,
                nextText: `gymTrainerLocke`
            }
        ]
    },

    {
        id: `gymTrainerLocke`,
        image: imagePaths.tallGrassBG,
        options: [
            {
                text: `StartBattle!`,
                nextText:`pewterCityGymTrainerLockeResult`
            }
        ]
    },
    {
        id: `pewterCityGymTrainerLockeResult`,
        image: imagePaths.pewterCityGymBG,
        left_char: imagePaths.ashe,
        right_char: imagePaths.trainerLocke,
        text: [
            "You find yourself in a challenging battle against the trainer's skilled Pokemon.",
            "With determination and strategy, you navigate through the tough fight.",
            "Finally, your Pokemon emerge victorious, showcasing your battling prowess.",
            "The defeated trainer graciously acknowledges your skill and sportsmanship."
        ],
        options: [
            {
                text: `Prepare to face Gym Leader Brock.`,
                nextText: `pewterCityGymLeaderBattle`
            }
        ]
    },
    {
        id: `pewterCityGymLeaderBattle`,
        image: imagePaths.pewterCityGymBG,
        left_char: imagePaths.ashe,
        right_char: imagePaths.gymLeaderBrock,
        text: [
            "You stand before the formidable Gym Leader Brock, ready for the ultimate challenge.",
            "The air is tense as you prepare to face his powerful rock-type Pokemon.",
            "This battle is a crucial test on your journey to becoming a Pokemon Master.",
            "The question lingers: can your Pokemon emerge victorious against Brock's formidable team?"
        ],
        options: [
            {
                text: `Battle Gym Leader Brock.`,
                nextText: `gymLeaderBrock`
            }
        ]
    },
    {
        id: `gymLeaderBrock`,
        image: imagePaths.tallGrassBG,
        options: [
            {
                text: `StartBattle!`,
                nextText:`pewterCityGymLeaderResult`
            }
        ]
    },
    {
        id: `pewterCityGymLeaderResult`,
        image: imagePaths.pewterCityGymBG,
        left_char: imagePaths.ashe,
        right_char: imagePaths.gymLeaderBrock,
        text: [
            "The battle against Gym Leader Brock reaches a fever pitch, each move strategic and intense.",
            "With unwavering determination, you skillfully guide your Pokemon to victory.",
            "Brock acknowledges your prowess, nodding in respect for your hard-fought triumph.",
            "In recognition of your achievement, he presents you with the Boulder Badge, a symbol of your success on the path to becoming a Pokemon Master."
        ],
        options: [
            {
                text: `Continue...`,
                nextText: `pewterCityGymLeaderResult1`
            }
        ]
    },
    {
        id: `pewterCityGymLeaderResult1`,
        image: imagePaths.pewterCityGymBG,
        right_char: imagePaths.boulderBadge,
        text: [`The Boulder Badge glimmers in the sunlight and is a testament to your first step to becoming a Pokemon Master.`],
        options: [
            {
                text: `End`,
                nextText: `endScreen`
            }
        ]
    },
    {
        id: `endScreen`,
        image: imagePaths.endScreenBG,
        center_char: imagePaths.flyingPikachu,
        text: [`The End!`,`Thank you for playing! Don't hesitate to explore the entire project on the Github, or contact me if you want to connect. Cheers, and happy coding!"`],
        options: [
            {
                text: [`Start Again!`],
                nextText: 1
            }
        ]
    }


]
