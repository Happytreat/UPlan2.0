import { connect } from "react-redux";
import { API } from "aws-amplify";
import UpdateSemester from './UpdateSemester.component';
import { actions as userActions, selectors as user } from '../../store/user/user.ducks';
import {get} from "lodash";

function mapStateToProps(state) {
  return {
    fetching: user.fetching(state),
    modules: user.modules(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setLoading: () => dispatch(userActions.request()),
    setError: (err) => dispatch(userActions.error(err)),
    saveSemester: async ({ id, semester }) => {
      await API.put("api", `/semesters/${id}`, { body: semester });
      const semesters = await API.get("api", "/semesters"); // TODO: put this in saga
      dispatch(userActions.update({ semesters }));
    },
    deleteSemester: async (id, moduleList) => {
      try {
        // TODO: To remove Hack for fast visual update
        dispatch(userActions.alt());

        // Delete all modules in that semester
        // TODO: Consider moving this to backend - delete all mod of sem
        // Since backend will have most updated module
        // await Promise.all(get(moduleList, `${id}`, []).map(async (mod) => {
        //   return API.del("api", `/delete-module/${mod.moduleId}`);
        // }));
        //
        // // TODO: Replan backend for this
        // // Update store's modules
        // const { modules } = await API.get("api", "/get-modules-list");

        await API.del("api", `/semesters/${id}`);
        const semesters = await API.get("api", "/semesters");

        // dispatch(userActions.update({ modules }));
        dispatch(userActions.update({ semesters }));
      } catch (err) {
        console.log('delete err', err);
        dispatch(userActions.error());
      }
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateSemester);
