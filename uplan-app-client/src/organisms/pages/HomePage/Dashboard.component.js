import React, { Component } from "react";
import { API } from "aws-amplify";
import PropTypes from "prop-types";
import { orderBy } from 'lodash';
import { Container, Button, ListGroup, Modal } from "react-bootstrap";

import LoadingPage from '../../../molecules/LoadingPage/LoadingPage';
import NewSemester from '../../../organisms/NewSemester/NewSemester';
import EditSemester from '../../../organisms/EditSemester/EditSemester';


// TODO: Refactor with Emoticon/Styled component
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
  container: {
    cursor: 'pointer',
    borderStyle: 'ridge',
    borderWidth: 'medium',
    padding: '0.75rem 0 0 0.5rem'
  },
  description: {
    color: '#666',
    paddingTop: '0.25rem',
  },
  modalHeader: {
    padding: '0.5rem 1rem',
  }
};

// TODO: Fix header appear first then fetched data (delay header till fetching true)
const SemesterModal = ({ title, C, cProps, ...props }) => {
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

export default class LoggedIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newSemModalShow: false,
      editSemModalShow: false,
      semId: null,
    };

    this.renderSemestersList = this.renderSemestersList.bind(this);
  }

  componentDidMount() {
    const { isAuth, setLoading, setError, updateSemesters } = this.props;
    // show throw error?
    if (!isAuth) {
      return;
    }

    // TODO: Refactor this in user.saga
    setLoading();

    try {
      updateSemesters();
    } catch (e) {
      alert(e);
      setError(e);
    }
  }

  // TODO: Fix re-rendering of dashboard after adding/updating semesters (fix by adding semester to redux store)
  renderSemestersList(semesters) {
    const orderedSemesters = orderBy(semesters, ['order'], 'asc');
    return [{}].concat(orderedSemesters).map(
      (semester, i) =>
        i !== 0
          ? (
            <>
              <Container key={semester.semesterId} style={styles.container} onClick={() => this.setState({ editSemModalShow: true, semId: semester.semesterId })}>
                <h6><b>{semester.name}</b></h6>
                <p style={styles.description}>{semester.description.trim().split("\n")[0]}</p>
              </Container>
            </>
          )
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
              <SemesterModal
                title="Update a Semester"
                C={EditSemester}
                cProps={{id: this.state.semId}}
                show={this.state.editSemModalShow}
                onHide={() => this.setState({ editSemModalShow: false })}
              />
            </>
          )
    );
  }

  // TODO: Find delay before showing spinner
  render() {
    const {
      props: {
        fetching,
        error, // TODO: Create page for error
        semesters,
      },
    } = this;

    console.log(semesters);

    return (
      <div style={styles.header}>
        <h3>Your Semesters</h3>
        <br />
        {
          fetching
          ? <><LoadingPage /></>
          : (
              <ListGroup>
                {this.renderSemestersList(semesters)}
              </ListGroup>
            )
        }
      </div>
    );
  }
}

LoggedIn.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  updateSemesters: PropTypes.func.isRequired,
  semesters: PropTypes.array.isRequired,
};
