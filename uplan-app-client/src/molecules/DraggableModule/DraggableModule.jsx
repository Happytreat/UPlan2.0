import React from 'react';
import {Draggable} from "react-beautiful-dnd";

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightblue' : 'skyblue',

  // styles we need to apply on draggables
  ...draggableStyle
});

const DraggableModule = ({ mod, index }) => {
  return (
    <Draggable
      key={mod.moduleId}
      draggableId={mod.moduleId}
      index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}>
          {mod.code}
        </div>
      )}
    </Draggable>
  )
};

export default DraggableModule;
