import {SELECT_SQUARE, SELECT_STEP, SET_STEPS_ORDER} from "./actionTypes";

export function selectSquare(index) {
    return {type: SELECT_SQUARE, index}
}

export function setStepsOrder(order) {
    return {type: SET_STEPS_ORDER, order}
}

export function selectStep(stepNumber) {
    return {type: SELECT_STEP, stepNumber}
}