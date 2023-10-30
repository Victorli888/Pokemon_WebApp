import {opponentPokemonTeam, playerPokemonTeam} from "./gameData";
import {gameTexts} from "./gameTexts";
import pokeBattleView from "./pokeBattleView";

async function startFightMove(fightMove, attackingPokemon, defendingPokemon) {
    console.log(`making Request to PokeAPI for ${fightMove}`)
    // Fetch move details from the PokeAPI
    const response = await fetch(`https://pokeapi.co/api/v2/move/${fightMove}`);
    const moveData = await response.json();

    if (!moveData) {
        console.log(`Move data for ${fightMove} is undefined`);
        return null; // or handle the error in an appropriate way
    }

    // Calculate damage based on move power and opponent's defense
    const damage = Math.floor((2 * attackingPokemon.attack * moveData.power) / defendingPokemon.defence / 5) + 2;
    console.log(`${attackingPokemon.name} used ${fightMove} and did ${damage} to ${defendingPokemon.name}`)
    // Update opponent's HP
    defendingPokemon.hp -= damage;

    return {
        attackingPokemon: attackingPokemon,
        defendingPokemon: defendingPokemon
    }
}

async function attemptPokemonCatch(pokemon, ballType) {
     let catchChance = pokemon.catchPercent + ballType.catchValue

    if (Math.random() < catchChance) {
        // Catch is successful
        console.log(`You caught ${pokemon.name}!`);
        return true;
    } else {
        // Catch failed
        console.log(`Oh no! ${pokemon.name} broke free.`);
        return false;
    }
}

function countEligiblePokemon(pokemonTeam) {
    let eligiblePokemonCount = 0;
    pokemonTeam.forEach(function(pokemon) {
        if (!pokemon.isFainted) {
            eligiblePokemonCount += 1;
        }
    });
    return eligiblePokemonCount;
}



// async function useBagItem(item, pokemon){
//     if (item.itemType === "potion"){
//         pokemon.hp += item.effect;
//     }
//     else if (item.itemType === "pokeball"){
//         let pokemonCatchSuccess = attemptPokemonCatch(pokemon, balltype)
//         if (pokemonCatchSuccess){
//             playerPokemonTeam.addToPlayerTeam(pokemon)
//             // Display Catch Succeeded
//         }
//         else{
//             // Display Catch Failed
//         }
//     }
// }

async function startPokeBattleRound(playerAction, selection, playerPokemon, opponentPokemon) {
    console.log("Start of the Round");
    let currentTurn = playerPokemon.speed > opponentPokemon.speed ? "player" : "opponent";
    let playerPendingTurn = true;
    let opponentPendingTurn = true;

    while (playerPendingTurn || opponentPendingTurn) {
        if (playerPendingTurn && playerPokemon && currentTurn === "player") {
            if (playerAction === "fight") {
                console.log("Player Selected Fight");
                let results = await startFightMove(selection, playerPokemon, opponentPokemon);
                results.attackingPokemon = playerPokemon
                results.defendingPokemon = opponentPokemon
                if (opponentPokemon && opponentPokemon.hp <= 0) {
                    break;
                }
            } else if (playerAction === "bag") {
                // useBagItem(somePotion, playerPokemon)
                console.log("WIP: using item!!!");
            } else if (playerAction === "pokemon") {
                console.log("WIP: Selecting Pokemon!!!")
                // newlySelectedPokemon = pickPokemon()
                // performPokemonSwap(playerPokemon, newlySelectedPokemon)
            } else {
                console.error("Something went wrong selecting a player move");
            }
            currentTurn = "opponent";
            playerPendingTurn = false;
            console.log(`the current Turn is now: ${currentTurn}`);
        }

        if (opponentPendingTurn && opponentPokemon && currentTurn === "opponent") {
            console.log("opponent making turn");
            let results = await startFightMove(opponentPokemon.moves[0], opponentPokemon, playerPokemon);
            results.attackingPokemon = opponentPokemon
            results.defendingPokemon = playerPokemon
            if (playerPokemon && playerPokemon.hp <= 0) {
                break;
            }
            currentTurn = "player";
            opponentPendingTurn = false;
            console.log(`the current Turn is now: ${currentTurn}`);
        }
        console.log(`player pending turn:${playerPendingTurn}, opponentPendingTurn:${opponentPendingTurn}`);
    }

    if (playerPokemon && playerPokemon.hp <= 0) {
        console.log(`${playerPokemon.name} has fainted`);
        setPokemonToFainted(playerPokemon);
        let playerRemainingPokemon = countEligiblePokemon(playerPokemonTeam);
        console.log(`Player Pokemon Remaining ${playerRemainingPokemon}`);
        if (playerRemainingPokemon === 0) {
            console.log("setting White out to True");
            playerPokemon.willWhiteOut = true;
        }
    } else if (opponentPokemon && opponentPokemon.hp <= 0) {
        console.log(`${opponentPokemon.name} has fainted`);
        setPokemonToFainted(opponentPokemon);
        let opponentRemainingPokemon = countEligiblePokemon(opponentPokemonTeam);
        if (opponentRemainingPokemon === 0) {
            opponentPokemon.willWhiteOut = true;
            console.log("setting White out to True");
        }
        else{
            const nextOpponentPokemonIndex = opponentPokemonTeam.indexOf(opponentPokemon) + 1;
            if (nextOpponentPokemonIndex < opponentPokemonTeam.length) {
                const nextOpponentPokemon = opponentPokemonTeam[nextOpponentPokemonIndex];
                opponentPokemon = nextOpponentPokemon
                console.log(`New opponent Pokemon set to: ${nextOpponentPokemon.name}`);
            } else {
                console.log("No more opponent Pokemon left");
            }
        }
    }

    return {
        playerPokemon: playerPokemon,
        opponentPokemon: opponentPokemon
    };
}


function setPokemonToFainted(pokemon){
    pokemon.isFainted = true
    pokemon.hp = 0
}

function performBagAction(playerPokemon, opponentPokemon) {
    // Handle items from the player's bag (e.g., healing items)
    // Allow only consumables, that effect the player's stats.
    // pickItem(
    // useitem(playerSelectedItem, isTrainerBattle)
    // Update Pokémon stats or conditions accordingly
    // Return battle result
}

function performPokemonSwap(currentPokemon, selectedPokemon) {

    if (selectedPokemon.isFainted){
        return currentPokemon
    }

    else{
        return selectedPokemon
    }
}

// Export the battle logic functions and constants
export {
    startPokeBattleRound,
    performBagAction,
    performPokemonSwap,
};

