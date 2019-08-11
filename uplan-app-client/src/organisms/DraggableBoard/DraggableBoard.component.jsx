import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import PropTypes from "prop-types";
import { orderBy, map } from "lodash";
import DraggableModulelist from '../../molecules/DraggableModuleList/DraggableModuleList';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

class DraggableBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      draggableList: this.props.modules,
      /**
       * Should look like:
       * draggableList: {
       *   "semId": [{moduleId: ...}, {moduleId: ...}],
       *   "semId": [{moduleId: ...}, {moduleId: ...}],
       * }
       * */
    };

    this.getList = this.getList.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  // Get module list for a particular semester
  getList = semId => this.state.draggableList[semId];

  onDragEnd = result => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const reordered = reorder(
        this.getList(source.droppableId),
        source.index,
        destination.index
      );

      // Update order of sem's moduleList
      let draggableList = this.state.draggableList;
      draggableList[source.droppableId] = reordered;
      this.setState({ draggableList });

    } else {
      const reordered = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      );

      // Update order of both sems' moduleList
      let draggableList = this.state.draggableList;
      draggableList[source.droppableId] = reordered[source.droppableId];
      draggableList[destination.droppableId] = reordered[destination.droppableId];
      this.setState({ draggableList }); // update store
    }
  };

  render() {
    // Fix: draggableList should be updated when semesters and modules change
    const { draggableList } = this.state;
    const semesterList = orderBy(this.props.semesters, ['order'], 'asc');

    console.log('draggableList', draggableList);

    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        {
          map(semesterList, sem => {
            return <DraggableModulelist sem={sem} moduleList={draggableList[sem.semesterId]} />
          })
        }
      </DragDropContext>
    );
  }
}

DraggableBoard.propTypes = {
  semesters: PropTypes.array.isRequired,
  // tags: PropTypes.array.isRequired,
  modules: PropTypes.array.isRequired,
};

export default DraggableBoard;
