import {
    START_BATTLE, PICK_OPTION, PICK_MOVE,
    EXECUTE_MOVE, SHOW_TEXT, SWAP_POKEMON, SWAP_PLAYER_POKEMON, SET_PLAYER_CURRENT_POKEMON
} from '../actionTypes/actionTypes';

import { SET_POKE_OPTIONS_STATE, SET_FIGHT_OPTIONS_STATE, SET_POKE_SWAP_STATE,
    SET_POKE_BAG_STATE, SET_POKE_RUN_STATE, SET_TURN_ONE_STATE, SET_TURN_TWO_STATE } from '../actionTypes/actionTypes';

import {initialBattleState} from "../data/initialState";

const pokeBattleReducer = (state = initialBattleState, action) => {
    switch (action.type) {

        case START_BATTLE:
            // Fill with logic to start the battle
            // The action.payload will be storyProgress from your actions file
            return {
                ...state,
                // may have more modified properties
            };

        case 'SET_OPPONENT_CURRENT_POKEMON': {
            return {
                ...state,
                opponentCurrentPokemon: action.payload
            }
        }

        case SET_PLAYER_CURRENT_POKEMON: {
            return {
                ...state,
                playerCurrentPokemon: action.payload
            }
        }

        case PICK_OPTION:
            // Fill with logic as per the option chosen
            return {
                ...state,
                // may have more modified properties
            };

        case PICK_MOVE:
            // Fill with logic to execute when a move is picked
            return {
                ...state,
                // may have more modified properties
            };

        case SHOW_TEXT:
            console.log(`SHOW_TEXT action received at reducer! payload: ${action.payload[0]}`);
            return {
                ...state,
                isGameTextShown: true,
                currentTextList: action.payload,
            }



    // CASES For setting STATE
        case 'SET_POKE_OPTIONS_STATE': {
            return {
                ...state,
                currentPhase: 'PokeOptionsState'
            };
        }
        case 'SET_FIGHT_OPTIONS_STATE': {
            return {
                ...state,
                currentPhase: 'FightOptionsState'
            };
        }
        // case 'SET_FAINTED':{
        //     return {
        //         ...state
        //
        //     }
        // }

        case 'SET_POKE_SWAP_STATE': {
            return {
                ...state,
                currentPhase: 'PokeSwapState'
            };
        }
        case 'SET_POKE_BAG_STATE': {
            return {
                ...state,
                currentPhase: 'PokeBagState'
            };
        }
        case 'SET_POKE_RUN_STATE': {
            return {
                ...state,
                currentPhase: 'PokeRunState'
            };
        }
        case 'SET_TURN_ONE_STATE': {
            return {
                ...state,
                currentPhase: 'TurnOneState'
            };
        }
        case 'SET_TURN_TWO_STATE': {
            return {
                ...state,
                currentPhase: 'TurnTwoState'
            };
        }

    // Other stuff
        case 'START_TURN':
            return{
                ...state,
            }
        case 'HIDE_TEXT':
            return {
                ...state,
                isGameTextShown: false
            };

        case 'SET_OPPONENT_FIGHT_MOVE':
            return{
                ...state,
                opponentChoice: action.payload
            }

        case 'SET_WAIT_FOR_CONTINUE':
            return {
                ...state,
                waitForContinue: action.payload
            }

        case 'SET_PLAYER_TEAM':
            return {
                ...state,
                playerCurrentTeam: action.payload
            };

        case 'SET_OPPONENT_TEAM':
                return{
                ...state,
                opponentCurrentTeam: action.payload
                }

        case 'SET_ITEM_TO_USE':
            return{
                ...state,
                itemToUse: action.payload
            }

        case 'USER_CONTINUED':
            return {...state, waitForUserContinue: false };

        case 'SET_OPPONENT_ACTION':
            return {
                ...state,
                opponentAction: action.payload
            };

        case 'SET_PLAYER_CHOICE':
            return {
                ...state,
                playerChoiceType: action.payload.choiceType,
                playerChoice: action.payload.choice
            }

        case 'SET_ROUND_COMPLETED':
            return{
                ...state,
                roundCompleted: action.payload
            }

        case 'DETERMINE_TURN_ORDER':
            return {
                ...state,
                turnOrder: action.payload
            }

        case 'SET_TURN_ORDER':
            return{
                ...state,
                turnOrder: action.payload
            }
        default:
            return state;
    }
}
 export default pokeBattleReducer;