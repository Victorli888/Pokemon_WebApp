
import {
    ADD_POKEMON,
    UPDATE_POKEMON,
    REMOVE_POKEMON,
    ADD_POKEMON_TO_TEAM,
    REMOVE_POKEMON_FROM_TEAM
} from '../actionTypes/actionTypes';

export function addPokemon(pokemon) {
    return { type: ADD_POKEMON, payload: pokemon }
}

export function updatePokemon(pokemon) {
    return { type: UPDATE_POKEMON, payload: pokemon }
}

export function removePokemon(pokemonId) {
    return { type: REMOVE_POKEMON, payload: pokemonId }
}

export function addPokemonToTrainer(trainerId, pokemonId) {
    return { type: ADD_POKEMON_TO_TEAM, payload: { trainerId, pokemonId } }
}

export function removePokemonFromTrainer(trainerId, pokemonId) {
    return { type: REMOVE_POKEMON_FROM_TEAM, payload: { trainerId, pokemonId } }
}