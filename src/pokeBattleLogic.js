async function startFightMove(fightMove, attackingPokemon, defendingPokemon) {
    try {
        // Fetch move details from the PokeAPI
        const response = await fetch(`https://pokeapi.co/api/v2/move/${fightMove}`);
        const moveData = await response.json();

        // Calculate damage based on move power and opponent's defense
        const damage = Math.floor((2 * attackingPokemon.attack * moveData.power) / defendingPokemon.defence / 5) + 2;
        console.log(`${attackingPokemon.name} used ${fightMove} and did ${damage} to ${defendingPokemon.name}`)
        // Update opponent's HP
        defendingPokemon.hp -= damage;

        // Check if the opponent's HP is reduced to 0 or below
        if (defendingPokemon.hp <= 0) {
            // Opponent fainted, return victory result
            return {
                result: 'victory',
                attackingPokemon: attackingPokemon,
                defendingPokemon: defendingPokemon,
            };
        } else {
            // Opponent still has HP, return continue result
            return {
                result: 'continue',
                attackingPokemon: attackingPokemon,
                defendingPokemon: defendingPokemon,
            };
        }
    } catch (error) {
        console.error(error);
        // Handle error case
        return {
            result: 'error',
            attackingPokemon: attackingPokemon,
            defendingPokemon: defendingPokemon,
        };
    }
}

function performBagAction(playerPokemon, opponentPokemon) {
    // Handle items from the player's bag (e.g., healing items)
    // Allow only consumables, that effect the player's stats.
    // pickItem(
    // useitem(playerSelectedItem, isTrainerBattle)
    // Update Pokémon stats or conditions accordingly
    // Return battle result
}

function performPokemonSwap(playerPokemon, opponentPokemon) {
    // Allow the player to switch their active Pokémon
    // Determine if the switch is valid (e.g., not fainted Pokémon)
    // Update active Pokémon save the array state & continue Battle
    // Return battle result
}

function attemptEscape(playerPokemon, opponentPokemon, isTrainerBattle) {
    // Determine if the player successfully escapes from the battle
    // Consider factors like Pokémon speed and battle conditions
    // Return battle result (escape or continue)
}

// Export the battle logic functions and constants
export {
    startFightMove,
    performBagAction,
    performPokemonSwap,
    attemptEscape,
};

