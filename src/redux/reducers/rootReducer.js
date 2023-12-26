import { combineReducers } from 'redux';
import pokemonReducer from './pokemonReducer';
import pokeBattleReducer from './pokeBattleReducer';

const rootReducer = combineReducers({
    pokemon: pokemonReducer,
    pokeBattle: pokeBattleReducer    // the state produced by pokeBattleReducer will live under this 'pokeBattle' key
});

export default rootReducer;