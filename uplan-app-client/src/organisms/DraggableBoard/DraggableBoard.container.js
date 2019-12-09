import { connect } from "react-redux";
import DraggableBoard from './DraggableBoard.component';
import { actions as userActions, selectors as user } from '../../store/user/user.ducks';

function mapStateToProps(state) {
  return {
    semesters: user.semesters(state),
    modules: user.modules(state),
    fetching: user.fetching(state),
    // TODO: Change this to module List (or create NEW state instead of editing original)
    alt: user.alt(state), // since redux cannot differentiate tht modules deep equal has changed
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateDraggableList: draggableList => dispatch(userActions.dragRequest(draggableList)),
    updateModulePosition: module => dispatch(userActions.updateModule(module)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DraggableBoard);
