import {pokemonBattles} from "./gamePokeBattles";

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

async function startPokeBattleRound(playerAction, selection, playerPokemon, opponentPokemon, playerTeam, opponentTeam){
    const isPlayerFaster = playerPokemon.speed > opponentPokemon.speed
    const turnOrder = isPlayerFaster? ['player','opponent']:['opponent','player']

    const battleData = {
        player: {pokemon: playerPokemon, team: playerTeam, action: playerAction, moveSelection: selection},
        opponent: {pokemon: opponentPokemon, team: opponentTeam, action: 'fight', moveSelection: opponentPokemon.moves[0]}
    }

    let actionQueue = []

    for(let attacker of turnOrder){
        let defender = turnOrder[1-turnOrder.indexOf(attacker)]
        console.log(`Start of ${attacker}'s turn.`)
        if (battleData[attacker].action === 'fight'){
            await handleFightAction(attacker, battleData[attacker], battleData[defender]);
            actionQueue.push({action: 'fight', actor: attacker, target: defender})
            await updateBattleData(battleData[attacker], battleData[defender])


        }


    // else if (battleData[attacker].action === 'bag'){
    //     await handleBagAction(attacker, battleData[attacker])
    // }
    //
    // else if (battleData[attacker.action] === 'pokemon'){
    //     await handlePokemonAction(attacker, battleData[attacker])
    // }
    // else if (battleData[attacker.action] === 'run'){
    //     await handleRunAction(attacker, battleData[attacker])
    // }
    else {
        console.error(`Invalid action selected by ${attacker}.`);
    }
    console.log(` ${attacker}'s turn end.`);
    }
    return {
        playerPokemon: battleData["player"].pokemon,
        opponentPokemon: battleData["opponent"].pokemon,
        turnOrder: actionQueue
    }
}


async function updateBattleData (attackingTrainer, defendingTrainer) {
    console.log(`LOOK AT ME: ${defendingTrainer.pokemon.name}`)
    if (defendingTrainer.pokemon.hp <= 0) {
        console.log(` ${defendingTrainer.pokemon.name} has fainted, Attempting Swapping Pokemon `);
        await handlePokemonFainted(defendingTrainer.pokemon);
        const newPokemon = await forceSwap(defendingTrainer.team);
        let previousPokemon = defendingTrainer.pokemon
        defendingTrainer.pokemon = newPokemon

        if (!newPokemon) {
            defendingTrainer.pokemon = previousPokemon
            defendingTrainer.pokemon.willWhiteOut = true
        }
    }
}
async function forceSwap(team) {
    let nextAvailablePokemon = team.find(pokemon => !pokemon.isFainted && pokemon.hp > 0);

    if (!nextAvailablePokemon) {
        console.log('No more available Pokemon in team!');
        return null;
    }

    console.log(`Switched to next available Pokemon: ${nextAvailablePokemon.name}`);
    return nextAvailablePokemon;
}
async function handlePokemonFainted(pokemon){
    pokemon.isFainted = true
    pokemon.hp = 0
}

async function handleFightAction(trainer, attacker, defender) {
    console.log(`${trainer} Selected Fight`);

    let fightResult = await startFightMove(attacker.moveSelection, attacker.pokemon, defender.pokemon);


    // Updating pokemon objects with changes that have occurred as a result of the fight move
    // attacker.pokemon = fightResult.attackingPokemon;
    // defender.pokemon = fightResult.defendingPokemon;

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

export default class PokeBattleLogic {
}