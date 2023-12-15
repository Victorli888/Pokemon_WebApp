import { combineReducers } from 'redux';
import pokemonReducer from './pokemonReducer';

const rootReducer = combineReducers({
    pokemon: pokemonReducer,
    // other reducers
});

export default rootReducer;