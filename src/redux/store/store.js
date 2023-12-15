import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from '../reducers/pokemonReducer';
import teamReducer from '../reducers/pokeTeamReducer';
import pokeBagReducer from "../reducers/pokeBagReducer";

const store = configureStore({
    reducer: {
        pokemon: pokemonReducer,
        teams: teamReducer,
        pokeInventory: pokeBagReducer
    },
});

export default store;