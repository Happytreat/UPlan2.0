import { connect } from "react-redux";
import { API } from "aws-amplify";
import UpdateSemester from './UpdateSemester.component';
import { actions as userActions, selectors as user } from '../../store/user/user.ducks';

function mapStateToProps(state) {
  return {
    fetching: user.fetching(state),
    error: user.error(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setLoading: () => dispatch(userActions.request()),
    setError: (err) => dispatch(userActions.error(err)),
    saveSemester: async ({ id, semester }) => {
      await API.put("semesters", `/semesters/${id}`, { body: semester });
      const semesters = await API.get("semesters", "/semesters"); // TODO: put this in saga
      dispatch(userActions.update({ semesters }));
    },
    deleteSemester: async (id) => {
      await API.del("semesters", `/semesters/${id}`);
      const semesters = await API.get("semesters", "/semesters");
      dispatch(userActions.update({ semesters }));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateSemester);
