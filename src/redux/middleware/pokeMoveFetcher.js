import { updatePokemon } from '../actions/pokeBattleActions';

// This is a middleware that listens for 'FETCH_POKEMON_DATA' action and then performs data fetching
export const pokeMoveFetcher = store => next => action => {
    // If dispatched action is 'FETCH_POKEMON_DATA'
    if (action.type === 'FETCH_MOVE_DATA') {
        // Fetch the data
        const url = `https://pokeapi.co/api/v2/move/${action.payload}`;
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                // Now data contains the entire Pokémon payload in JSON format;
                store.dispatch(updatePokemon(data))
                console.log(`setting Data for ${action.payload} was successful`)
            })
            .catch((error) => {
                console.error(`Error fetching ${action.payload}'s data:`, error);
            });
    }
    return next(action);
};
