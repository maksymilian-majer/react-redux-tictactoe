import { connect } from 'react-redux'
import Moves from "../components/Moves";
import {selectStep, setStepsOrder, StepsOrder} from "../actions";

const mapStateToProps = (state) => ({
    history: state.history,
    stepNumber: state.history.length,
    orderStepsAsc: state.stepsOrder === StepsOrder.ASC
});

const mapDispatchToProps = {
    onSelectMove: selectStep,
    onToggleOrder: (value) => setStepsOrder(value ? StepsOrder.ASC : StepsOrder)
};

const MovesContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Moves);

export default MovesContainer;