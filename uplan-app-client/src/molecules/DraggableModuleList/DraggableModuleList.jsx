import React from 'react';
import { Droppable } from "react-beautiful-dnd";
import DraggableModule from '../DraggableModule/DraggableModule';
import styled from "styled-components";
import { Grid } from "@material-ui/core";

const grid = 8;

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightgrey' : 'white',
  padding: grid*2,
  borderStyle: 'ridge',
  borderWidth: 'thin',
  width: 300,
});

const SemesterName = styled.h6`
  padding-top: 0.25rem;
`;

const Description = styled.p`
  color: #666;
  font-size: 12px;
`;

const StyledGrid = styled(Grid)`
  cursor: pointer;
  border-style: ridge;
  border-width: thin;
  word-wrap: break-word;
  text-align: center;
  max-width: 300px;
  white-space: nowrap;
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
  @media only screen and (min-width: 768px) {
    height: 60vh;
  }
`;

const DraggableModuleList = ({ sem, moduleList }) => {
  return (
    <div key={sem.semesterId}>
      <StyledGrid item key={sem.semesterId}>
        <SemesterName><b>{sem.name}</b></SemesterName>
        <Description>{sem.description.trim().split("\n")[0]}</Description>
      </StyledGrid>
      <Droppable droppableId={sem.semesterId}>
        {(provided, snapshot) => (
          <DroppableCol
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}>
            {moduleList.map((mod, index) => (
              <DraggableModule mod={mod} index={index} />
            ))}
            {provided.placeholder}
          </DroppableCol>
        )}
      </Droppable>
    </div>
  )
};

export default DraggableModuleList;
