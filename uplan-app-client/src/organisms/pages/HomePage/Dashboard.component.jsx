import React, { Component } from "react";
import PropTypes from "prop-types";
import { orderBy } from 'lodash';
import {
  Button, Grid,
} from '@material-ui/core';
import styled from 'styled-components'

import MainModal from '../../../molecules/Modal/Modal';
import LoadingPage from '../../../molecules/LoadingPage/LoadingPage';
import NewSemester from '../../NewSemester/NewSemester.container';
import EditSemester from '../../UpdateSemester/UpdateSemester.container';

const PageWrapper = styled.div`
  padding: 1.5rem;
  font-family: Open Sans, sans-serif;
  font-weight: 600;
  overflow: hidden;
  line-height: 1.5;
  text-overflow: ellipsis;
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

    this.renderSemestersList = this.renderSemestersList.bind(this);
  }

  async componentDidMount() {
    const { isAuth, updateSemesters } = this.props;
    if (!isAuth) {
      return; // show throw error?
    }

    await updateSemesters();
  }

  renderSemestersList(semesters) {
    const orderedSemesters = orderBy(semesters, ['order'], 'asc');
    const result = [];
    result.push(
      <div key='unique-id123'>
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
      </div>
    );
    return result.concat(orderedSemesters.map(
      (semester) =>
        <StyledGrid item xs={12} key={semester.semesterId} onClick={() => this.setState({ editSemModalShow: true, semId: semester.semesterId })}>
          <h6><b>{semester.name}</b></h6>
          <Description>{semester.description.trim().split("\n")[0]}</Description>
        </StyledGrid>
      )
    );
  }


  // TODO: Find delay before showing spinner
  render() {
    const {
      props: {
        fetching,
        semesters,
      },
    } = this;

    return (
      <PageWrapper>
        <h3>Your Semesters</h3>
        <br />
        {
          fetching
          ? <><LoadingPage /></>
          : (
            <Grid container>
              {this.renderSemestersList(semesters)}
            </Grid>
            )
        }
      </PageWrapper>
    );
  }
}

LoggedIn.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  updateSemesters: PropTypes.func.isRequired,
  semesters: PropTypes.array.isRequired,
};
