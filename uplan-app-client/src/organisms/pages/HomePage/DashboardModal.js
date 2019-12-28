import React from 'react';
import { ModalModes } from '../../../consts/modal';
import MainModal from '../../../molecules/Modal/Modal';

import NewSemester from '../../NewSemester/NewSemester.container';
import EditSemester from '../../UpdateSemester/UpdateSemester.container';
import NewModule from '../../../molecules/NewModule/NewModule.container';
import UpdateModule from '../../../molecules/UpdateModule/UpdateModule.container';

// renderModal({ mode, showModal, onHide: () => this.setState({ showModal: false, mode: '' }), semId })
export const renderModal = ({
  mode, onHide, showModal, ...cProps
}) => {
  switch (mode) {
    case `${ModalModes.NEW_SEMESTER}`:
      return (
        <MainModal
          title="Add a Semester"
          C={NewSemester}
          show={showModal}
          onHide={onHide}
        />
      );
    case `${ModalModes.UPDATE_SEMESTER}`:
      return (
        <MainModal
          title="Update a Semester"
          C={EditSemester}
          cProps={{ semesterId: cProps.id }}
          show={showModal}
          onHide={onHide}
        />
      );
    case `${ModalModes.NEW_MODULE}`:
      return (
        <MainModal
          title="Add a Module"
          C={NewModule}
          cProps={{ semesterId: cProps.id }}
          show={showModal}
          onHide={onHide}
        />
      );
    case `${ModalModes.UPDATE_MODULE}`:
      return (
        <MainModal
          title="Update a Module"
          C={UpdateModule}
          cProps={{ moduleId: cProps.id }}
          show={showModal}
          onHide={onHide}
        />
      );
    default:
      return null;
  }
};
