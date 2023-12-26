import {
    EXECUTE_MOVE,
    OPEN_BAG,
    OPEN_POKEMON,
    PICK_ITEM,
    PICK_MOVE,
    PICK_OPTION,
    PICK_POKEMON, REMOVE_FROM_POKEBAG,
    RUN_AWAY, SET_PLAYER_CURRENT_POKEMON,
    SHOW_TEXT,
    START_BATTLE, SWAP_PLAYER_POKEMON,
    SWAP_PLAYER_POKEMONPOKEMON
} from '../actionTypes/actionTypes';
import {setPokeOptionsState} from "./StateActions";
import {requestPokemonData, updatePokemon} from "./pokemonActions"


export function executeMove(pokemon, move) {
    return { type: EXECUTE_MOVE, payload: { pokemon, move } };
}

export function startBattle() {
    return { type: START_BATTLE };
}

export function pickOption(option) {
    return { type: PICK_OPTION, payload: option };
}

export function pickMove(pokemon, move) {
    return { type: PICK_MOVE, payload: { pokemon, move } };
}

export function openBag() {
    return { type: OPEN_BAG };
}

export function pickItem(item) {
    return { type: PICK_ITEM, payload: item };
}

export function openPokemon() {
    return { type: OPEN_POKEMON };
}

export function pickPokemon(pokemon) {
    return { type: PICK_POKEMON, payload: pokemon };
}

export function runAway() {
    return { type: RUN_AWAY };
}


// export function showText(newTextList) {
//     console.log("Attempting to show new Text...")
//     return { type: SHOW_TEXT, payload: newTextList };
// }

export function userContinued() {
    return (dispatch, getState) => {
        dispatch({ type: 'USER_CONTINUED' });
        dispatch({ type: 'SET_WAIT_FOR_CONTINUE', payload: false });
    };
}

export function showText(newTextList) {
    return (dispatch, getState) => {
        dispatch({ type: SHOW_TEXT, payload: newTextList });
        dispatch({ type: 'SET_WAIT_FOR_CONTINUE', payload: true });
    };
}



// export const fetchMoveData = (moveName) => {
//     return {type: FETCH_MOVE_DATA, payload: moveName}
// }

export const setOpponentCurrentPokemon = (pokemon) => {
    return {type: 'SET_OPPONENT_CURRENT_POKEMON', payload: pokemon}

}

export const setPlayerCurrentPokemon = (pokemon) => {
    return { type: SET_PLAYER_CURRENT_POKEMON, payload: pokemon };
};

// Starting Round of Battle
export const setOpponentFightMove = (fightMove) => ({
    type: 'SET_OPPONENT_FIGHT_MOVE',
    payload: fightMove
})

// export const grabFightMoveData = (move) => ({
//     type: 'PERFORM_MOVE',
//     payload: {move}
// })

export const setPlayerChoice = (choiceType, choice) => ({
    type: 'SET_PLAYER_CHOICE',
    payload: {choiceType, choice}
})

// export const setPlayerCurrentPokemon = (pokemon) => {
//     return {
//         type: 'SET_PLAYER_CURRENT_POKEMON',
//         payload: pokemon
//     };
// };


export const updateOpponentTeam = (pokemonTeam) => ({
    type: 'UPDATE_OPPONENT_TEAM',
    payload: pokemonTeam
})

export const updatePlayerTeam = (pokemonTeam) => ({
    type: 'UPDATE_PLAYER_TEAM',
    payload: pokemonTeam
})
// export const calculateDamage = () => ({
//     type: 'CALCULATE_DAMAGE'
// })
//
// export const setFainted = () => ({
//     type: 'SET_FAINTED'
// })

export const setOpponentAction = (actionType) => ({
    type: 'SET_OPPONENT_ACTION',
    payload: actionType
})

export const setTurnOrder = (newTurnOrder) =>({
    type: 'SET_TURN_ORDER',
    payload: newTurnOrder
})

export const setItemToUse = (itemToUse) =>({
    type: 'SET_ITEM_TO_USE',
    payload: itemToUse
})

export function setOpponentTeam(team){
    return{ type: 'SET_OPPONENT_TEAM', payload: team }
}

export function setPlayerTeam(team){
    return { type: 'SET_PLAYER_TEAM', payload: team }
}
export const endTurn = () => ({
    type: 'END_TURN'
});

// all your existing imports and action creators

// ... some code ...

export const determineTurnOrder = (playerPokemon, opponentPokemon) => {
    return (dispatch, getState) => {
        // Grab PlayerAction & opponentAction from Root of state.
        const {playerAction, opponentAction} = getState();
        let turnOrder;

        if (playerAction !== 'fight' && opponentAction !== 'fight') {
            turnOrder = ['player', 'opponent'];
        }
        else if (playerAction !== 'fight') {
            turnOrder = ['player', 'opponent'];
        }
        else if (opponentAction !== 'fight') {
            turnOrder = ['opponent', 'player'];
        }
        else if (playerPokemon.speed < opponentPokemon.speed) {
            turnOrder = ['opponent', 'player'];
        }
        else if (playerPokemon.speed > opponentPokemon.speed) {
            turnOrder = ['player', 'opponent'];
        }
        else {  // If speed is equal, choose randomly
            turnOrder = Math.random() < 0.5 ? ['player', 'opponent'] : ['opponent', 'player'];
        }
        dispatch(setTurnOrder(turnOrder));
    }
};

export const fetchMoveData = async moveName => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/move/${moveName}`); // replace with your pokemon move API
        return await response.json()
    } catch (error) {
        console.error(error);
        throw error
    }
};

const fetchMoveDataAndExecute = async (fightMoveName, attacker, defender, currentTurn, dispatch) => {
    try {
        let fightLog = [];
        const moveData = await fetchMoveData(fightMoveName);
        console.log(`move Data ${moveData}`);
        const moveDataType = moveData.damage_class.name;
        console.log(`Damage Type: ${moveDataType}, Defender: ${defender}, attacker: ${attacker}`);

        if (moveDataType === "special" || moveDataType === "physical") {
            const damage = Math.floor((2 * attacker.attack * moveData.power) / defender.defence / 5) + 2;
            const updatedDefender = { ...defender, hp: Math.max(0, defender.hp - damage) };
            updatePokemon(updatedDefender);
            console.log(`${attacker.name} did ${damage} to ${updatedDefender.name}, Health is now at: ${updatedDefender.hp}`);
            fightLog.push(`${attacker.name} used ${fightMoveName}`);
            dispatch(showText(fightLog));

            if (updatedDefender.hp === 0) {
                updatedDefender.isFainted = true;
                // checkFaintedAndForceAction(fightLog)
            }
            if (updatedDefender.hp === 0) {
                updatedDefender.isFainted = true;
                // checkFaintedAndForceAction(fightLog)
            }
        }

    } catch (error) {
        console.error(error);
    }
};

async function hasTeamFainted(pokemonTeam, dispatch) {
    const pokeTeamObjects = await Promise.all(pokemonTeam.map(name => dispatch(requestPokemonData(name))));

    for (const pokemon of pokeTeamObjects) {
        if (pokemon.hp > 0) {
            return false;
        }
    }
    return true;
}


const checkFaintedAndForceAction = (dispatch, pokemon, currentTurn, fightLog) => {
    // Implement logic to check if the Pokemon has fainted here
    const isPlayerTeamFainted = hasTeamFainted()
    const isOpponentTeamFainted = hasTeamFainted()
    // if(hasFainted) {
        if(currentTurn === 'player'){
            // Check if the player has any Pokemon left to swap
            // Suppose we have a hasPokemonLeft selector to fetch this kind of information
            // const hasPokemonLeft = hasPokemonLeftSelector(getState());
            const hasPokemonLeft = true // Temp Remove
            if (isPlayerTeamFainted) {
                // If not, end the battle
                // dispatch(endBattle());

                console.log("Force Game End YOU LOSE")

            } else {
                // force the action to be 'swapPokemon'
                // dispatch(forcePlayerAction('swapPokemon'));
                console.log("force Swap Pokemon")
            }
        }
        else{
            if (isOpponentTeamFainted) {
                // If not, end the battle
                // dispatch(endBattle());

                console.log("Force Game End YOU WIN")

            } else {
                // force the action to be 'swapPokemon'
                // dispatch(forcePlayerAction('swapPokemon'));
                console.log("force Swap Pokemon")
            }
        }
}

async function executeAndWaitForContinue(dispatch, getState, action) {
    dispatch(action);
    while (getState().battleState.waitForUserContinue) {
        await new Promise(r => setTimeout(r, 500));
    }
}

export const setWaitForContinue = (status) => {
    return { type: 'SET_WAIT_FOR_CONTINUE', payload: status };
}

function chooseOpponentFightMove(pokemon ,dispatch){
    const randomMoveIndex = Math.floor(Math.random() * pokemon.moves.length);
    const randomMove = pokemon.moves[randomMoveIndex];
    dispatch(setOpponentFightMove(randomMove));
}

export const startTurn = () => {
    return async (dispatch, getState) => {
        dispatch({ type: 'START_TURN' });
        let fightLog = [];
        const { turnOrder, playerChoiceType, opponentChoiceType, playerChoice, opponentChoice, playerCurrentPokemon, opponentCurrentPokemon, isTrainerBattle } = getState().battleState;
        console.log(`${playerChoice} and ${playerChoiceType}`)
        console.log(`Turn Order for starting turn: ${turnOrder}`)
        for (let i = 0; i < turnOrder.length; i++) {

            const currentTurn = turnOrder[i];
            console.log(`CURRENT TURN: ${currentTurn}`)

            if(currentTurn === 'player' &&  playerChoiceType ==='fight'){
                await fetchMoveDataAndExecute(playerChoice, playerCurrentPokemon, opponentCurrentPokemon,currentTurn, dispatch)
                while (getState().battleState.waitForContinue) {
                    await new Promise(resolve => setTimeout(resolve, 500));
                }
                dispatch(setWaitForContinue(false))
                console.log(getState().battleState); // this will log the complete state of pokeBattle
            }

            if (currentTurn === 'player' && playerChoiceType ==='bag') {
                // apply item to pokemon
                // update Pokemon Data in store
                // update On screen add details to TextList
                const {itemToUse} = getState().battleState;

                if (playerChoice === null || itemToUse === null) {
                    throw new Error('Pokemon or item is null');
                }
                console.log(getState().battleState);
                console.log(`item to use: ${itemToUse.name}`)
                let updatedPokemon = {...playerChoice, hp: playerChoice.hp + itemToUse.potency}
                fightLog.push(`Player used ${itemToUse.name} to Heal  ${playerChoice.name} for ${itemToUse.potency} Points.`)
                dispatch(updatePokemon(updatedPokemon))

                dispatch(showText(fightLog))
                dispatch({type: REMOVE_FROM_POKEBAG, payload: {name: itemToUse.name}});

                while (getState().battleState.waitForContinue) {
                    await new Promise(resolve => setTimeout(resolve, 500));
                }
            }


            if (currentTurn === 'player' && playerChoiceType === 'swap'){
                dispatch(setPlayerCurrentPokemon(playerChoice))
                fightLog.push(`player has swapped to ${playerChoice.name}`);
                dispatch(showText(fightLog))
                while (getState().battleState.waitForContinue) {
                    await new Promise(resolve => setTimeout(resolve, 500));
                }
                dispatch(setWaitForContinue(false))
            }

            if (currentTurn === 'player' && playerChoiceType === 'run'){
                if(isTrainerBattle){
                    fightLog.push("Unable to Run from a Trainer battle!")
                    dispatch(showText(fightLog))
                }
                else{
                    fightLog.push("You Ran Away...")
                    dispatch(showText(fightLog))
                    // END BATTLE HERE
                }
            }

            if (currentTurn === 'opponent' && opponentChoiceType === 'fight'){
                dispatch(showText([`Opponent's Turn!`]));
                chooseOpponentFightMove(opponentCurrentPokemon, dispatch)
                const {opponentChoice} = getState().battleState

                await fetchMoveDataAndExecute(opponentChoice, opponentCurrentPokemon, playerCurrentPokemon, currentTurn, dispatch)
                // while (!getState().battleState.continueStatus) {
                //     await new Promise(resolve => setTimeout(resolve, 500));
                // }
                while (getState().battleState.waitForContinue) {
                    await new Promise(resolve => setTimeout(resolve, 500));
                }
                dispatch(setWaitForContinue(false))
            }
            // const pokemon = role === 'player' ? playerCurrentPokemon : opponentCurrentPokemon;
            // const actionType = role === 'player' ? playerAction : opponentAction;
            // const move = ...; // choose the move for the target here, depends on your setup

            // Display results of previous action to the user and wait for user to click 'Continue...'
            // dispatch(showText(`Now ${role} is going to ${actionType}`));


            while (getState().isGameTextShown) {
                await new Promise(resolve => setTimeout(resolve, 500));
            }

            // Execute the chosen action
            // await executeAction(dispatch, getState, pokemon, actionType, move);

            // update and display the result after the action
            // dispatch(updateAndDisplayResult());

            // check if the opposing Pokemon has fainted and if whiteout end game
        }
        dispatch(setPokeOptionsState())
        dispatch({ type: 'END_TURN' });console.log(getState().battleState);
    }
}




// const executePokemonAction = (dispatch, attacker, defender, actionType) => {
//     const damage = Math.floor(Math.random() * 10 + 1); // replace this with your battle logic
//
//     switch (actionType) {
//         case HEAL_POKEMON:
//             dispatch({ type: actionType, payload: { attacker, amount: damage } });
//             break;
//         case DAMAGE_POKEMON:
//             dispatch({ type: actionType, payload: { attacker, amount: damage } });
//             break;
//         default:
//             break;
//     }