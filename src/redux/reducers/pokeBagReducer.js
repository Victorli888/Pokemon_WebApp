import { ADD_TO_POKEBAG, REMOVE_FROM_POKEBAG } from '../actionTypes/actionTypes';
import {initialPlayerBagState} from '../data/initialState'
const inventoryReducer = (state = initialPlayerBagState, action) => {
    switch (action.type) {
        case ADD_TO_POKEBAG: {
            const { name } = action.payload;

            return {
                ...state,
                [name]: {
                    ...state[name],
                    quantity: state[name] ? state[name].quantity + 1 : 1,
                },
            };
        }

        case REMOVE_FROM_POKEBAG: {
            const { name } = action.payload;

            if (state[name] && state[name].quantity > 1) {
                return {
                    ...state,
                    [name]: {
                        ...state[name],
                        quantity: state[name].quantity - 1
                    }
                };
            }
            else if (state[name] && state[name].quantity === 1) {
                return {
                    ...state,
                    [name]: {
                        ...state[name],
                        quantity: 0
                    }
                };
            } else {
                return state;
            }
        }

        default:
            return state;
    }
}

export default inventoryReducer;