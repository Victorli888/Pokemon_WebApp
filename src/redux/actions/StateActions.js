import {
    SET_POKE_OPTIONS_STATE,
    SET_FIGHT_OPTIONS_STATE,
    SET_POKE_SWAP_STATE,
    SET_POKE_BAG_STATE,
    SET_POKE_RUN_STATE,
    SET_TURN_ONE_STATE,
    SET_TURN_TWO_STATE
} from '../actionTypes/actionTypes';

export const setPokeOptionsState = () => {
    return {
        type: SET_POKE_OPTIONS_STATE
    };
};

export const setFightOptionsState = () => {
    return {
        type: SET_FIGHT_OPTIONS_STATE
    };
};

export const setPokeSwapState = () => {
    return {
        type: SET_POKE_SWAP_STATE
    };
};

export const setPokeBagState = () => {
    return {
        type: SET_POKE_BAG_STATE
    };
};

export const setPokeRunState = () => {
    return {
        type: SET_POKE_RUN_STATE
    };
};

export const setGameOverState = () => {
    return {
        type: 'SET_GAME_OVER_STATE'
    };
};

export const setWinnerState = () => {
    return {
        type: 'SET_WINNER_STATE'
    };
};

