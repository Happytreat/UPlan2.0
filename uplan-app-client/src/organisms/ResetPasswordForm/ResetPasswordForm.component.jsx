import React, { Component } from "react";
import PropTypes from "prop-types";

import ResetPasswordBeforeCodeForm from './ResetPasswordBeforeCode';
import ResetPasswordAfterCodeForm from './ResetPasswordAfterCode';

class PasswordReset extends Component {
  render() {
    const { handleEmailSubmit, handleResetSubmit, isCodeSent, email } = this.props;
    return isCodeSent
      ? <></>
      : <><ResetPasswordBeforeCodeForm handleEmailSubmit={handleEmailSubmit} /></>;
  }
}

PasswordReset.propTypes = {
  handleEmailSubmit: PropTypes.func.isRequired,
  handleResetSubmit: PropTypes.func.isRequired,
  isCodeSent: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
};

export default PasswordReset;
