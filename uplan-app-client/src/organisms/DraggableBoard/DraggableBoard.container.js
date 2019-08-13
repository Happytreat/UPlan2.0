import { connect } from "react-redux";
import { API } from "aws-amplify";
import DraggableBoard from './DraggableBoard.component';
import { actions as userActions, selectors as user } from '../../store/user/user.ducks';

function mapStateToProps(state) {
  return {
    semesters: user.semesters(state),
    modules: user.modules(state),
    fetching: user.fetching(state),
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
