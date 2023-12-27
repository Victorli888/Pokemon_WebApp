import {
    ADD_POKEMON_TO_TEAM,
    REMOVE_POKEMON_FROM_TEAM
} from '../actionTypes/actionTypes';

import {initialTeamsState} from "../data/initialState";

export default function teamReducer(state = initialTeamsState, action) {
    switch (action.type) {
        case ADD_POKEMON_TO_TEAM:
            return {
                ...state,
                [action.payload.teamName]: [
                    ...(state[action.payload.teamName] || []), // If team exists, spread the data, else create an empty array
                    action.payload.pokemonName
                ]
            };

        case REMOVE_POKEMON_FROM_TEAM:
            return {
                ...state,
                [action.payload.teamName]: [
                    ...(state[action.payload.teamName] || []).filter(pokemonName => pokemonName !== action.payload.pokemonName) // Filter out the removed pokemon from team
                ]
            };

        default:
            return state;
    }
}