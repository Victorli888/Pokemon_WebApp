// import { SET_POKE_OPTIONS_STATE, SET_FIGHT_OPTIONS_STATE, SET_POKE_SWAP_STATE,
//     SET_POKE_BAG_STATE, SET_POKE_RUN_STATE, SET_TURN_ONE_STATE, SET_TURN_TWO_STATE } from '../actionTypes/actionTypes';
//
// import {initialBattleState} from "../data/initialState";
//
// const battleStateSwitcherReducer = (state = initialBattleState, action) => {
//     switch (action.type) {
//         case 'SET_POKE_OPTIONS_STATE': {
//             return {
//                 ...state,
//                 currentPhase: 'PokeOptionsState'
//             };
//         }
//         case 'SET_FIGHT_OPTIONS_STATE': {
//             return {
//                 ...state,
//                 currentPhase: 'FightOptionsState'
//             };
//         }
//         case 'SET_POKE_SWAP_STATE': {
//             return {
//                 ...state,
//                 currentPhase: 'PokeSwapState'
//             };
//         }
//         case 'SET_POKE_BAG_STATE': {
//             return {
//                 ...state,
//                 currentPhase: 'PokeBagState'
//             };
//         }
//         case 'SET_POKE_RUN_STATE': {
//             return {
//                 ...state,
//                 currentPhase: 'PokeRunState'
//             };
//         }
//         case 'SET_TURN_ONE_STATE': {
//             return {
//                 ...state,
//                 currentPhase: 'TurnOneState'
//             };
//         }
//         case 'SET_TURN_TWO_STATE': {
//             return {
//                 ...state,
//                 currentPhase: 'TurnTwoState'
//             };
//         }
//         default:
//             return state;
//     }
// }
// export default battleStateSwitcherReducer;