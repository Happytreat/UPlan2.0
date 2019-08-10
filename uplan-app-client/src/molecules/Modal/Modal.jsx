import React from 'react';
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";

const styles = {
  modalHeader: {
    padding: '0.5rem 1rem',
  }
};

// TODO: Fix header appear first then fetched data (delay header till fetching true)
const MainModal = ({ title, C, cProps, ...props }) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" style={styles.modalHeader}>
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <C cProps={cProps} onHide={props.onHide} />
      </Modal.Body>
    </Modal>
  );
};

MainModal.propTypes = {
  title: PropTypes.string.isRequired,
  C: PropTypes.node.isRequired,
};

export default MainModal;
