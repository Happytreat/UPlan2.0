import React, { Component } from "react";
import { API } from "aws-amplify";
import PropTypes from "prop-types";
import { orderBy } from 'lodash';
import { LinkContainer } from "react-router-bootstrap";
import { Button, ListGroup, Modal } from "react-bootstrap";

import LoadingPage from '../../../molecules/LoadingPage/LoadingPage';
import NewSemester from '../../../organisms/NewSemester/NewSemester';
import EditSemester from '../../../organisms/Semesters/Semesters';

const styles = {
  header: {
    padding: '1.5rem',
    fontFamily: "Open Sans sans-serif",
    fontWeight: '600',
    overflow: 'hidden',
    lineHeight: '1.5',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  link: {
    cursor: 'pointer',
  },
  description: {
    color: '#666',
    paddingTop: '0.25rem',
  },
  modalHeader: {
    padding: '0.5rem 1rem',
  }
};

const SemesterModal = ({ title, C, ...props }) => {
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
        <C />
      </Modal.Body>
    </Modal>
  );
};

export default class LoggedIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      semesters: [],
      newSemModalShow: false
    };

    this.renderSemestersList = this.renderSemestersList.bind(this);
  }

  async componentDidMount() {
    // show throw error?
    if (!this.props.isAuth) {
      return;
    }

    try {
      const semesters = await this.semesters();
      this.setState({ semesters });
    } catch (e) {
      alert(e);
    }
    this.setState({ isLoading: false });
  }

  semesters() {
    return API.get("semesters", "/semesters");
  }

  renderSemestersList(semesters) {
    const orderedSemesters = orderBy(semesters, ['order'], 'asc');
    return [{}].concat(orderedSemesters).map(
      (semester, i) =>
        i !== 0
          ? <LinkContainer
            style={styles.link}
            key={semester.semesterId}
            to={`/semesters/${semester.semesterId}`}
          >
            <ListGroup.Item>
              <h6><b>{semester.name}</b></h6>
              <p style={styles.description}>{semester.description.trim().split("\n")[0]}</p>
            </ListGroup.Item>
          </LinkContainer>
          : (
            <>
              <Button variant="outline-dark" style={styles.link} onClick={() => this.setState({ newSemModalShow: true })}>
                  <b>{"\uFF0B "}</b>
                  Add a new semester
              </Button>
              <SemesterModal
                title="Add a Semester"
                C={NewSemester}
                show={this.state.newSemModalShow}
                onHide={() => this.setState({ newSemModalShow: false })}
              />
            </>
          )
    );
  }

  // TODO: Find delay before showing spinner
  render() {
    return (
      <div style={styles.header}>
        <h3>Your Semesters</h3>
        <br />
        {
          this.state.isLoading
          ? <><LoadingPage isLoading={this.state.isLoading} /></>
          : (
              <ListGroup>
                {!this.state.isLoading &&
                this.renderSemestersList(this.state.semesters)}
              </ListGroup>
            )
        }
      </div>
    );
  }
}

LoggedIn.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};
