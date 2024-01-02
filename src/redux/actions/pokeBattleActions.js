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
import {setGameOverState, setPokeOptionsState, setPokeSwapState, setWinnerState} from "./StateActions";
import {requestPokemonData, updatePokemon} from "./pokemonActions"
import {initialTeamsState as pokemonTeams} from "../../redux/data/initialState";
import {convertToPokemonObjects} from "../../pokeBattle/utility";
import store from "../store/store";


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

export const setIsTrainerBattle = (status) => ({
    type: 'SET_IS_TRAINER_BATTLE',
    payload: status

})

export const setStageType = (stage) => ({
    type: 'SET_STAGE_TYPE',
    payload: stage
})
// export const setPlayerChoiceType = (choiceType) => ({
//     type: 'SET_PLAYER_CHOICE_TYPE',
//     payload: choiceType
// })

// export const setPlayerCurrentPokemon = (pokemon) => {
//     return {
//         type: 'SET_PLAYER_CURRENT_POKEMON',
//         payload: pokemon
//     };
// };


// export const updateOpponentTeam = (pokemonTeam) => ({
//     type: 'UPDATE_OPPONENT_TEAM',
//     payload: pokemonTeam
// })
//
// export const updatePlayerTeam = (pokemonTeam) => ({
//     type: 'UPDATE_PLAYER_TEAM',
//     payload: pokemonTeam
// })
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
export function setPlayerPokeNames(names){
    return{type: 'SET_PLAYER_POKE_NAMES', payload: names}
}

export function setOpponentPokeNames(names){
    return{type: 'SET_OPPONENT_POKE_NAMES', payload: names}
}
export const endTurn = () => ({
    type: 'END_TURN'
});

export const setCurrentPhase = () => ({
    type: 'SET_CURRENT_PHASE'
})

export const resetBattleState = () => ({
    type: 'RESET_BATTLE_STATE'
})

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

const fetchMoveDataAndExecute = async (fightMoveName, attacker, defender, playerTeam, opponentTeam, currentTurn, dispatch) => {
    try {
        let fightLog = [];
        const moveData = await fetchMoveData(fightMoveName);
        console.log(`move Data ${moveData}`);
        const moveDataType = moveData.damage_class.name;
        console.log(`Damage Type: ${moveDataType}, Defender: ${defender.name}, attacker: ${attacker.name}`);

        if (moveDataType === "special" || moveDataType === "physical") {
            const damage = Math.floor((2 * attacker.attack * moveData.power) / defender.defence / 5) + 2;
            const updatedDefender = { ...defender, hp: Math.max(0, defender.hp - damage) };
            dispatch(updatePokemon(updatedDefender));
            if (currentTurn==='player'){
                // setPlayerCurrentPokemon(attacker)
                dispatch(setOpponentCurrentPokemon(updatedDefender))
            }
            else{
                dispatch(setPlayerCurrentPokemon(updatedDefender))
                // setOpponentCurrentPokemon(attacker)
            }
            console.log(`${attacker.name} did ${damage} to ${updatedDefender.name}, Health is now at: ${updatedDefender.hp}`);
            fightLog.push(`${attacker.name} used ${fightMoveName}`);

            if (updatedDefender.hp === 0) {
                console.log(`${updatedDefender.name} has fainted`)
                handleFaintedPokemon(dispatch, updatedDefender, playerTeam, opponentTeam, currentTurn, fightLog)

            }
            if (attacker.hp === 0) {
                // handleFaintedPokemon(attacker)
                // checkFaintedAndForceAction(fightLog)
            }
        }
        console.log("IM HERE MASON")
        dispatch(showText(fightLog));

    } catch (error) {
        console.error(error);
    }
};


function areAllPokemonFainted(pokemonList) {
    // Check if every Pokémon in the list has isFainted set to true
    return pokemonList.every(pokemon => pokemon.isFainted);
}

function findNonFaintedPokemon(pokemonList, currentPokemon) {
    // Find the first Pokémon that is not fainted
    const newPokemon = pokemonList.find(pokemon => !pokemon.isFainted && pokemon.name !== currentPokemon.name) || null;
    console.log(`THIS IS THE NEW POKEMON: ${newPokemon.name}`)
    return pokemonList.find(pokemon => !pokemon.isFainted && pokemon.name !== currentPokemon.name) || null;

}

const handleFaintedPokemon = (dispatch, pokemon, playerTeam, opponentTeam, currentTurn, fightLog) => {
    // Implement logic to check if the Pokemon has fainted here
    // if(hasFainted) {
        if(currentTurn === 'opponent'){
           const updatedPokemon = {...pokemon, isFainted: true}
            dispatch(updatePokemon(updatedPokemon))
            fightLog.push(`Player's ${pokemon.name} has fainted...`)
            dispatch(setPokeSwapState())
        }
        else{
            const updatedPokemon = {...pokemon, isFainted: true}
            console.log(`THEY HAVE ALL FAINTED: ${areAllPokemonFainted(opponentTeam)}`)
            dispatch(updatePokemon(updatedPokemon))
            if(!areAllPokemonFainted(opponentTeam)){
                dispatch(setOpponentCurrentPokemon(findNonFaintedPokemon(opponentTeam, updatedPokemon.name)))
            }
            console.log("OPPONENT MUST SWAP POKEMON")
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

export const setRoundCompleted = (status) =>{
    return {type: 'SET_ROUND_COMPLETED', payload: status}
}

function chooseOpponentFightMove(pokemon ,dispatch){
    const randomMoveIndex = Math.floor(Math.random() * pokemon.moves.length);
    const randomMove = pokemon.moves[randomMoveIndex];
    dispatch(setOpponentFightMove(randomMove));
}

async function waitForResponse(dispatch, getState) {
    const state = getState();
    if (state.battleState.waitForContinue) {
        return new Promise((resolve) =>
            setTimeout(() => resolve(waitForResponse(dispatch, getState)), 500)
        );
    } else {
        //waitForContinue is now false,
        //you can proceed with whatever should happen after waitForContinue turns to false
    }
}

// function waitForResponse(dispatch, getState) {
//     return new Promise(resolve => {
//         const unsubscribe = store.subscribe(() => {
//             if (!getState().battleState.waitForContinue) {

//                 unsubscribe();
//                 resolve();
//             }
//             console.log('Please')
//         });
//     });
// }



export const startTurn = () => {
    return async (dispatch, getState) => {
        dispatch(setRoundCompleted(false));
        let fightLog = [];
        const { turnOrder, playerChoiceType, opponentChoiceType, playerChoice, opponentChoice, isTrainerBattle } = getState().battleState;
        console.log(`${playerChoice} and ${playerChoiceType}`)
        console.log(`Turn Order for starting turn: ${turnOrder}`)
        for (let i = 0; i < turnOrder.length; i++) {
            const {playerCurrentPokemon, opponentCurrentPokemon} = getState().battleState
            const currentTurn = turnOrder[i];
            console.log(`CURRENT TURN: ${currentTurn}`)

            if(currentTurn === 'player' &&  playerChoiceType ==='fight'){
                const {playerCurrentTeam, opponentCurrentTeam} = getState().battleState
                console.log(getState().battleState)
                await fetchMoveDataAndExecute(playerChoice, playerCurrentPokemon, opponentCurrentPokemon, playerCurrentPokemon, opponentCurrentTeam, currentTurn, dispatch)
                // while (getState().battleState.waitForContinue) {
                //     console.log("I'm stuck")
                //     await new Promise(resolve => setTimeout(resolve, 500));
                // }
                await waitForResponse(dispatch, getState)
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
                if (getState().battleState.playerCurrentPokemon.name === playerChoice.name){
                    dispatch(setPlayerCurrentPokemon(updatedPokemon))
                }

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

                await fetchMoveDataAndExecute(opponentChoice, opponentCurrentPokemon, playerCurrentPokemon, playerCurrentPokemon, opponentCurrentPokemon, currentTurn, dispatch)

                // while (getState().battleState.waitForContinue) {
                //     console.log("I'm stuck")
                //     await new Promise(resolve => setTimeout(resolve, 500));
                // }
                await waitForResponse(dispatch, getState)
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

        dispatch(setPlayerTeam(convertToPokemonObjects(getState().battleState.playerPokeNames, getState().pokemon)))
        dispatch(setOpponentTeam(convertToPokemonObjects(getState().battleState.opponentPokeNames, getState().pokemon)))
        dispatch(setPokeOptionsState())
        dispatch(setRoundCompleted(true));

        const {playerCurrentTeam, opponentCurrentTeam} = getState().battleState

        if(areAllPokemonFainted(playerCurrentTeam)){
            dispatch(setGameOverState())
        }
        else if(areAllPokemonFainted(opponentCurrentTeam)){
            dispatch(setWinnerState())
        }

        console.log(getState().pokemon)
        console.log(getState().battleState)
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