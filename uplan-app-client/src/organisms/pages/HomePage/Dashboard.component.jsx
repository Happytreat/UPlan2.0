import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Button, Grid,
} from '@material-ui/core';
import styled from 'styled-components'

import LoadingPage from '../../../molecules/LoadingPage/LoadingPage';
import MainModal from '../../../molecules/Modal/Modal';
import NewSemester from '../../NewSemester/NewSemester.container';
import EditSemester from '../../UpdateSemester/UpdateSemester.container';
import DraggableBoard from '../../DraggableBoard/DraggableBoard.container';

const PageWrapper = styled.div`
  padding: 1.5rem;
  font-family: Open Sans, sans-serif;
  font-weight: 600;
  overflow: hidden;
  line-height: 1.5;
  text-overflow: ellipsis;
  // display: flex;
  // justify-content: space-between;
`;

const Description = styled.p`
  color: #666;
  padding-top: 0.25rem;
`;

const StyledGrid = styled(Grid)`
  cursor: pointer;
   border-style: ridge;
   border-width: medium;
   padding: 0.75rem 0 0 0.5rem;
   word-wrap: break-word;
`;

export default class LoggedIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newSemModalShow: false,
      editSemModalShow: false,
      semId: null,
    };
  }

  async componentDidMount() {
    const { isAuth, updateDashboard } = this.props;
    if (!isAuth) {
      return; // show throw error?
    }

    await updateDashboard(); // Move this update to draggable board?
  }

  // TODO: Find delay before showing spinner
  render() {
    const { fetching } = this.props;
    return (
      <PageWrapper>
        <h3>Your Semesters</h3>
        <br />
        {
          fetching ? <LoadingPage />
          : (
              <Grid container>
                <Grid item xs={12} key="unique-id-123">
                  <Button onClick={() => this.setState({ newSemModalShow: true })}>
                    <b>{"\uFF0B "}</b>
                    Add a new semester
                  </Button>
                  <MainModal
                    title="Add a Semester"
                    C={NewSemester}
                    show={this.state.newSemModalShow}
                    onHide={() => this.setState({ newSemModalShow: false })}
                  />
                  <MainModal
                    title="Update a Semester"
                    C={EditSemester}
                    cProps={{id: this.state.semId}}
                    show={this.state.editSemModalShow}
                    onHide={() => this.setState({ editSemModalShow: false })}
                  />
                </Grid>
                <DraggableBoard showModal={(semId) => this.setState({ editSemModalShow: true, semId })}/>
              </Grid>
            )
        }
      </PageWrapper>
    );
  }
}

LoggedIn.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  updateDashboard: PropTypes.func.isRequired,
  semesters: PropTypes.array.isRequired,
  fetching: PropTypes.bool.isRequired,
};

// <DraggableBoard />
