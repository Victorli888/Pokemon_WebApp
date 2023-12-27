import {
    ADD_POKEMON_TO_TEAM,
    UPDATE_POKEMON,
    REMOVE_POKEMON_FROM_TEAM
} from '../actionTypes/actionTypes';

import {initialPokemonState} from '../data/initialState'


export default function pokemonReducer(state = initialPokemonState, action) {
    switch (action.type) {
        case ADD_POKEMON_TO_TEAM:
            return { ...state, [action.payload.name]: action.payload };

        case UPDATE_POKEMON: {
            const { name, ...updatedFields } = action.payload;
            return {
                ...state,
                [name]: {
                    ...state[name],
                    ...updatedFields
                }
            };
        }

        case REMOVE_POKEMON_FROM_TEAM:
            const { [action.payload]: _, ...rest } = state;
            return rest;

        default:
            return state;
    }
}