import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Button, Grid,
} from '@material-ui/core';
import styled from 'styled-components'

import LoadingPage from '../../../molecules/LoadingPage/LoadingPage';
import { renderModal } from "./DashboardModal";
import { ModalModes } from "../../../consts/modal";
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
      semId: null,
      mode: '',
      showModal: false,
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
  // TODO: Fix loading when editing/adding semester ==> update the local state first
  render() {
    const { fetching } = this.props;
    const { mode, showModal, semId } = this.state;
    return (
      <PageWrapper>
        <h3>Your Semesters</h3>
        <br />
        {
          fetching ? <LoadingPage />
          : (
              <Grid container>
                <Grid item xs={12} key="unique-id-123">
                  <Button onClick={() => this.setState({ showModal: true, mode: ModalModes.NEW_SEMESTER })}>
                    <b>{"\uFF0B "}</b>
                    Add a new semester
                  </Button>
                  {
                    renderModal({ mode, showModal, onHide: () => this.setState({ showModal: false, mode: '' }), semId })
                  }
                </Grid>
                <DraggableBoard showModal={(semId) => this.setState({ showModal: true, semId, mode: ModalModes.UPDATE_SEMESTER })}/>
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
