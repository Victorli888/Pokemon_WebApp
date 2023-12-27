import {ADD_TO_POKEBAG, REMOVE_FROM_POKEBAG, REMOVE_POKEMON, UPDATE_POKEMON} from "../actionTypes/actionTypes";

export function updatePokeBag(itemID) {
    return { type: ADD_TO_POKEBAG, payload: itemID }
}

export function removeFromPokeBag(itemID) {
    return { type: REMOVE_FROM_POKEBAG, payload: itemID }
}