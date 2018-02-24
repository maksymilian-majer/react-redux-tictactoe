import {StepsOrder} from "../actions/index";
import {SET_STEPS_ORDER} from "../actions/actionTypes";

function stepsOrder(state = StepsOrder.ASC, action) {
    switch (action.type) {
        case SET_STEPS_ORDER:
            return action.order;
        default:
            return state;
    }
}

export default stepsOrder;