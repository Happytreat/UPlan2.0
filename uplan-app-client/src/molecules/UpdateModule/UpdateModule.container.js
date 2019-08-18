import { connect } from "react-redux";
import { API } from "aws-amplify";
import UpdateModuleForm from './UpdateModule.component';
import { actions as userActions } from '../../store/user/user.ducks';

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    getModule: async (moduleId) => {
      try {
        return await API.get("api", `/get-module/${moduleId}`);
      } catch {
        dispatch(userActions.error());
      }
    },
    handleDelete: async ({ moduleId, setSubmitting, onHide }) => {
      try {
        const confirmed = window.confirm('Are you sure you want to delete this module?');
        if (!confirmed) { return; }
        await API.del("api", `/delete-module/${moduleId}`);
        const { modules } = await API.get("api", "/get-modules-list");
        dispatch(userActions.update({ modules }));
        dispatch(userActions.alt());
      } catch (err) {
        // console.log('delete Error', err);
        dispatch(userActions.error());
      } finally {
        setSubmitting(false);
        onHide();
      }
    },
    handleSubmit: async ({ initValues, values, onHide, setSubmitting }) => {
      try {
        const module = {
          ...initValues, //semesterId, moduleId did not change
          ...values,
          credits: parseFloat(values.credits),
        };
        await API.put("api", "/update-modules", { body: module });
      } catch (err) {
        console.log('err', err);
        dispatch(userActions.error());
      } finally {
        setSubmitting(false);
        onHide();
      }
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateModuleForm);
