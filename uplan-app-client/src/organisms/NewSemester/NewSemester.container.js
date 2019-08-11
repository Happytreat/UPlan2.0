import { connect } from "react-redux";
import { API } from "aws-amplify";
import NewSemester from './NewSemester.component';
import { actions as userActions, selectors as user } from '../../store/user/user.ducks';

function mapStateToProps(state) {
  return {
    fetching: user.fetching(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setLoading: () => dispatch(userActions.request()),
    setError: (err) => dispatch(userActions.error(err)),
    createSemester: async (note) => {
      await API.post("api", "/semesters", { body: note });
      const semesters = await API.get("api", "/semesters");
      dispatch(userActions.update({ semesters }));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewSemester);
