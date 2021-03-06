import React from 'react';
import {Draggable} from "react-beautiful-dnd";
import { getItemStyle } from "../../utils/DraggableUtils";

const DraggableModule = ({ mod, index, onClick }) => {
  return (
    <Draggable
      key={mod.moduleId}
      draggableId={mod.moduleId}
      index={index}>
      {(provided, snapshot) => (
        <div
          onClick={onClick}
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
