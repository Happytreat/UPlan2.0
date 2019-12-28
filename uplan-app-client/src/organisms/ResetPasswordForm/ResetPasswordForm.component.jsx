import React from 'react';
import PropTypes from 'prop-types';

import ResetPasswordBeforeCodeForm from './ResetPasswordBeforeCode';
import ResetPasswordAfterCodeForm from './ResetPasswordAfterCode';

function PasswordReset(props) {
  const {
    handleEmailSubmit, handleResetSubmit, isCodeSent, email,
  } = props;
  return isCodeSent
    ? <ResetPasswordAfterCodeForm handleResetSubmit={handleResetSubmit} email={email}/>
    : <ResetPasswordBeforeCodeForm handleEmailSubmit={handleEmailSubmit}/>;
}


PasswordReset.propTypes = {
  handleEmailSubmit: PropTypes.func.isRequired,
  handleResetSubmit: PropTypes.func.isRequired,
  isCodeSent: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
};

export default PasswordReset;
