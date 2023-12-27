// Logger middleware
export const logger = store => next => action => {
    next(action);
    console.log('currentPhase: ', store.getState().battleState.currentPhase);
};