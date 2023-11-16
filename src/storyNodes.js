import imagePaths from "./imagePaths";
import {gameTexts} from "./gameTexts";

export const storyNodes = [
    {
        id: 1,
        image: imagePaths.bedroomBG,
        left_char: imagePaths.ashe,
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
        image: imagePaths.pokeLabExteriorBG,
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
        image: imagePaths.pokeLabInteriorBG,
        left_char: imagePaths.ashe,
        right_char: imagePaths.proffesorOak,
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
        image: imagePaths.pokeWorldMap,
        left_char: imagePaths.proffesorOak
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
        image: imagePaths.pokeStartersBG,
        text: 'But Enough about me! you came to embark on your adventure now which pokemon will you choose',
        options: [
            {
                text: 'Charmander the Fire type',
                nextText: 6
            },
            {
                text: 'Bulbasaur the Grass type',
                nextText: 7
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
        text: '\n' +
            'Charmander is a fiery Pokémon known for its intense personality and fiercely loyal nature. This spiky Fire-type creature adds a touch of tsundere flair to its character. At first glance, Charmander may come across as aloof and distant, but beneath its prickly exterior lies a deeply caring and devoted heart.\n' +
            '\n' +
            'With flames flickering on its back, Charmander embodies the passion and determination that fuel its actions. It possesses an inner fire that drives it to overcome any challenge it faces. When faced with adversity, Charmander\'s fiery spirit ignites, transforming it into a formidable force to be reckoned with..',
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
        text: 'Bulbasaur, the Grass-type Pokémon, possesses a gentle and shy nature that adds a touch of sweetness and innocence to its character. With its timid demeanor and endearing charm, Bulbasaur captures the hearts of trainers and admirers alike.',
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
        text:"Squirtle is a laid-back and easygoing Pokémon that effortlessly flows with the tides. As a Water-type creature, it embodies a sense of tranquility and adaptability, adapting to various situations with remarkable ease. Squirtle's calm demeanor and go-with-the-flow attitude make it a refreshing presence in any environment.",
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
        text: 'you picked Squirtle! From here on out this pokemon will be your partner on your journey! ',
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
        text: 'you picked Bulbasaur! From here on out this pokemon will be your partner on your journey!',
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
        text: 'you picked Charmander! From here on out this pokemon will be your partner on your journey!',
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
        left_char: imagePaths.pokeDex,
        right_char: imagePaths.proffesorOak,
        text: `Oh and before you go, I want you to have this.... It's a pokeDex it contains data for all the known pokemon we've discovered so far.
            ... The closest city is Pewter City why don't you start there.`,
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
        text: `You exit Oak's Pokelab, where do you want to go first?`,
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
        text: `You see a beautiful Pier, seagulls off in the distance, and the sun smiling over you`,
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
        text: `You Enter your Home, lay out on your couch and feel the coziness flow through you`,
        options: [
            {
                text: "I guess its about time to get off your lazy butt.",
                nextText: `palletTown`
            }
        ]
    },
    {
        id: `route3`,
        image: imagePaths.routeThreeBG,
        text: `as you walk on Route 3 you notice something rustling in the tall grass`,
        options: [
            {
                text: `check it out`,
                nextText:`trainerDale`
            },
            {
                text: 'ignore it',
                nextText: `trainerDale`
            }
        ]
    },
    {
        id: `lab`,
        image: imagePaths.pokeLabInteriorBG,
        left_char: imagePaths.ashe,
        right_char: imagePaths.proffesorOak,
        text: `oh Ash, You're back so fast. Did you forget something?`,
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
        text: `Pewter City is home to the Rock Type Gym, the Gym Leader Brock. Defeating him and earing the Pewter City Gym Badge will be a major milestone in your pokemon adventure.`,
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
        id: `trainerDale`,
        image: imagePaths.tallGrassBG,
        left_char: imagePaths.ashe,
        right_char: imagePaths.trainerDale,
        text: `A Pokemon trainer with pops out and says " Oh hey there! I'm trying catch pokemon but I need more practice battling!"`,
        options: [
            {
                text: `StartBattle`,
                nextText:`trainerBattleDale`
            }
        ]
    },
    {
        id: `trainerBattleDale`,
        image: imagePaths.tallGrassBG,
        options: [
            {
                text: `StartBattle!`,
                nextText:`splitPath`
            }
        ]
    },
    {
        id: `splitPath`,
        image: imagePaths.routeThreeSplitBG,
        text: `As you walk on Route 3, and you have decision to make do you take the path less traveled or continue on the route 3?`,
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
        text: `You enter the tall grass, and you're determined to find your way to Pewter City.`,
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
        text: `You continue through the tall grass, the path seems winding and uncertain.`,
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
        text: `You push forward, trying to make sense of the twisting paths.`,
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
        text: `You forge ahead through the tall grass, hoping you're getting closer to your destination.`,
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
        text: `You make a turn, unsure if it's the right way, but you have to keep going.`,
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
        text: `You retrace your steps and try to find a new path in the tall grass.`,
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
        text: `Congratulations! You emerge from the tall grass and finally reach Pewter City. Your journey through the maze is over.`,
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
        text: `As you make your way through Pewter City you see it as a small quaint town with some notable sights to visit `,
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
        text: `You enter the abandoned house and you see an empty living room with rotting floorboards, and in the corner of the house you see a tattered old wicker basket`,
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
        text: `As you walk towards the basket, you imagine what horrors could be left in it, and when you glance upon it you find nothing...`,
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
        text: `You approach a gorgeous home made of chiseled stone bricks, its intricate details and craftsmanship leaving you in awe. `,
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
        text: `I probably shouldn't barge into someone's house uninvited.`,
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
        text: `Oh Hello there, you look like quite the potential pokemon trainer. Would you care talking to this old man?  `,
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
        text: `I used to be a pokemon trainer just like you! let me ask you what do you think of your pokemon?  `,
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
        text: `Ah, you have a great bond with your Pokémon! That's wonderful to hear. Let me test your qualities as a trainer. Imagine you encounter a lost and injured Pokémon in the wild. What would you do?`,
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
        text: `Never forget this unshakable virtue you have ! Here's another scenario: You come across a Pokémon being mistreated by its trainer. How would you react?`,
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
        text: `Impressive, you're a kind-hearted trainer! One more question: You find a hurt and abandoned Pokémon that doesn't belong to you. What do you do?`,
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
        text: `You're absolutely the kind of trainer I was looking for! Your compassion and empathy for Pokémon are truly remarkable. I want to pass on to you my own life-long friend as a token of your compassionate nature. Will you accept this Pokémon?`,
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
        text: `Oh, it seems like you're still learning about being a compassionate trainer. Don't worry; we all start somewhere. Feel free to come back if you have more questions or want to learn. Good luck on your journey as a Pokémon trainer!`,
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
        text: `You step into the Pewter City Gym, known for its rock-type Pokémon. The gym is dimly lit, and the ground is covered in rocky terrain. Two trainers stand ready for a battle.`,
        options: [
            {
                text: `Challenge the first trainer.`,
                nextText: `pewterCityGymTrainer1Battle`
            },
            {
                text: `Leave the gym for now.`,
                nextText: `pewterCity`
            }
        ]
    },
    {
        id: `pewterCityGymTrainer1Battle`,
        image: imagePaths.pewterCityGymBG,
        left_char: imagePaths.ashe,
        right_char: imagePaths.trainerMark,
        text: `You engaged in a fierce battle with the trainer's Pokemon. It's a tough fight, but you manage to emerge victorious. The trainer nods in respect.`,
        options: [
            {
                text: `Challenge the second trainer.`,
                nextText: `pewterCityGymTrainer2Battle`
            }
        ]
    },
    {
        id: `pewterCityGymTrainer2Battle`,
        image: imagePaths.pewterCityGymBG,
        left_char: imagePaths.ashe,
        right_char: imagePaths.trainerLocke,
        text: `You engage in a challenging battle with the trainer. After a hard-fought battle, you manage to come out victorious. The trainer acknowledges your skill.`,
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
        text: `You face off against Gym Leader Brock. This is it the first real test on becoming a Pokemon Master. Can your Pokémon prevail against his rock-type pokemon?`,
        options: [
            {
                text: `Battle Gym Leader Brock.`,
                nextText: `pewterCityGymLeaderResult`
            }
        ]
    },
    {
        id: `pewterCityGymLeaderResult`,
        image: imagePaths.pewterCityGymBG,
        left_char: imagePaths.ashe,
        right_char: imagePaths.gymLeaderBrock,
        text: `The battle against Gym Leader Brock is intense, but with skill and determination, you manage to defeat his Pokemon Brock nods in respect and awards you the Boulder Badge as a sign of your victory.`,
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
        text: `The Boulder Badge glimmers in the sunlight and is a testament to your first step to becoming a Pokemon Master .`,
        options: [
            {
                text: `End`,
                nextText: `endScreen`
            }
        ]
    },
    {
        id: `endScreen`,
        image: imagePaths.pewterCityGymBG,
        text: `End Pictures.`,
        options: [
            {
                text: `Thank You for playing!`
            }
        ]
    }


]
