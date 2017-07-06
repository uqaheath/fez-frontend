/**
 * Created by uqvasai on 29/06/2017.
 */
export const STEPPER_INDEX_INCREASED = 'STEPPER_INDEX_INCREASED';
export const STEPPER_INDEX_DECREASED = 'STEPPER_INDEX_DECREASED';
export const STEPPER_INDEX_RESET = 'STEPPER_INDEX_RESET';

const actions = {
    increaseStep() {
        return {
            type: STEPPER_INDEX_INCREASED
        };
    },
    decreaseStep() {
        return {
            type: STEPPER_INDEX_DECREASED
        };
    },
    resetStepper() {
        return {
            type: STEPPER_INDEX_RESET
        };
    }
};

const reducers = {
    currentIndex(state = 0, action) {
        switch (action.type) {
            case STEPPER_INDEX_INCREASED:
                return state + 1;
            case STEPPER_INDEX_DECREASED:
                return state - 1;
            case STEPPER_INDEX_RESET:
                return 0;
            default:
                return state;
        }
    }
};

export default { actions, reducers };
