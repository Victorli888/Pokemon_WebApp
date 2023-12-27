import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from '../reducers/pokemonReducer';
import teamReducer from '../reducers/pokeTeamReducer';
import pokeBagReducer from "../reducers/pokeBagReducer";
import pokeBattleReducer from "../reducers/pokeBattleReducer"
import {logger} from "../middleware/stateLogger"
import {pokeDataFetcher} from "../middleware/pokeDataFetcher";

const store = configureStore({
    reducer: {
        pokemon: pokemonReducer,
        teams: teamReducer,
        pokeInventory: pokeBagReducer,
        battleState: pokeBattleReducer,

    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(logger, pokeDataFetcher),
});

export default store;