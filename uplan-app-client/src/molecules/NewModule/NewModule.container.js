import { connect } from "react-redux";
import { API } from "aws-amplify";
import NewModuleForm from './NewModule.component';
import { actions as userActions } from '../../store/user/user.ducks';

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    handleSubmit: async ({ values, semesterId, onHide, setSubmitting }) => {
      try {
        const module = {
          ...values,
          credits: parseFloat(values.credits),
          semesterId,
        };
        const m = await API.post("api", "/add-modules", { body: module });
        const { modules } = await API.get("api", "/get-modules-list");
        dispatch(userActions.update({ modules }));
        dispatch(userActions.alt());
      } catch (err) {
        // console.log('err', err);
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
)(NewModuleForm);
