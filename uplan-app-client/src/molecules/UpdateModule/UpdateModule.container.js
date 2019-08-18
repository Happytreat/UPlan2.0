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
        const m = await API.get("api", "/get-modules", { body: moduleId });
        console.log('m', m);
        return {
          code: m.code,
          description: m.description,
          credits: parseFloat(m.credits),
        };
      } catch {
        dispatch(userActions.error());
      }
    },
    handleDelete: async ({ moduleId, setSubmitting, onHide }) => {
      try {
        const confirmed = window.confirm('Are you sure you want to delete this module?');
        if (!confirmed) { return; }
        await API.del("api", "/delete-module", { body: moduleId });
      } catch {
        dispatch(userActions.error());
      } finally {
        setSubmitting(false);
        onHide();
      }
    },
    handleSubmit: async ({ values, onHide, setSubmitting }) => {
      try {
        const module = {
          ...values,
          credits: parseFloat(values.credits),
        };
        await API.post("api", "/update-modules", { body: module });
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
