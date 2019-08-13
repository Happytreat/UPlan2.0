import React from 'react';
import { Droppable } from "react-beautiful-dnd";
import DraggableModule from '../DraggableModule/DraggableModule';
import styled from "styled-components";
import { Button, Grid } from "@material-ui/core";
import { getListStyle } from '../../utils/DraggableUtils';
import { ModalModes } from "../../consts/modal";

const SemesterName = styled.h6`
  padding-top: 1rem;
`;

const Description = styled.p`
  color: #666;
  font-size: 12px;
`;

const StyledGrid = styled(Grid)`
  cursor: pointer;
  background-color: #faf8f5;
  border-style: ridge;
  border-width: thin;
  word-wrap: break-word;
  text-align: center;
  max-width: 250px;
  height: 5rem;
  // For iphone5
  @media only screen and (max-width: 320px) {
    padding-right: 5vh;
  }
  // Galaxy s5
  @media only screen and (max-width: 360px) {
    padding-right: 3vh;
  }
`;

const DroppableCol = styled.div`
  margin: 0 0.75rem 0.6rem 0;
  @media only screen and (min-width: 768px) {
    height: 55vh;
  }
  height: 40vh;
`;

const trimDescription = (description) => {
  const text = description.substring(0, 30).trim().split("\n")[0];
  return description.length > 40
    ? `${text}...`
    : text
};

const DraggableModuleList = ({ sem, moduleList, showModal }) => {
  return (
    <div key={sem.semesterId}>
      <StyledGrid item onClick={() => showModal(ModalModes.UPDATE_SEMESTER)(sem.semesterId)}>
        <SemesterName><b>{sem.name}</b></SemesterName>
        <Description>
          {trimDescription(sem.description)}
        </Description>
      </StyledGrid>
      <Droppable droppableId={sem.semesterId}>
        {(provided, snapshot) => (
          <DroppableCol
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}>
            {moduleList.map((mod, index) => (
              <DraggableModule key={`${sem.semesterId}${mod.moduleId}-draggableModule`} mod={mod} index={index} />
            ))}
            {provided.placeholder}
            <Button style={{ color: '#999', textTransform: 'none', marginLeft: '1rem'}} onClick={() => showModal(ModalModes.NEW_MODULE)(sem.semesterId)}>
              <b>{"\uFF0B "}</b>
              Add a new module
            </Button>
          </DroppableCol>
        )}
      </Droppable>
    </div>
  )
};

export default DraggableModuleList;
