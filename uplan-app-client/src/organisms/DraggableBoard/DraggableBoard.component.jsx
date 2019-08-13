import React, {PureComponent} from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import PropTypes from "prop-types";
import { map, find } from "lodash";
import styled  from 'styled-components';
import DraggableModulelist from '../../molecules/DraggableModuleList/DraggableModuleList';
import { reorder, move } from "../../utils/DraggableUtils";


const ScrollContainer = styled.div`
  display: flex;
  overflow: scroll;
  @media only screen and (min-width: 768px) {
    height: 70vh;
    min-width: 100%;
  }
`;

class DraggableBoard extends PureComponent {
  constructor(props) {
    super(props);

    this.getList = this.getList.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.updateDraggableStateAndProps = this.updateDraggableStateAndProps.bind(this);
    this.renderModuleLists = this.renderModuleLists.bind(this);
  }

  // Get module list for a particular semester
  getList = semId => this.props.modules[semId];

  // Update local state draggableList and propagate changes to store modules
  updateDraggableStateAndProps = ({ module, sourceId, destinationId, reordered }) => {
    let draggableList = this.props.modules;
    if (sourceId === destinationId) {
      draggableList[sourceId] = reordered;
    } else {
      draggableList[sourceId] = reordered[sourceId];
      draggableList[destinationId] = reordered[destinationId];
    }
    // TODO: To refactor
    this.props.updateModulePosition(module);
    this.props.updateDraggableList(draggableList);
  };

  onDragEnd = result => {
    const { source, destination } = result;
    const { getList, updateDraggableStateAndProps, props: { modules: draggableList } } = this;

    // dropped outside the list
    if (!destination) {
      return;
    }

    // Update the semesterId of module
    const module = {
      // module which has been dragged
      ...find(draggableList[source.droppableId], mod => mod.moduleId === result.draggableId),
      semesterId: destination.droppableId,
    };

    // TODO: Not sure to disable this as won't be stored in db (unless implement order)
    if (source.droppableId === destination.droppableId) {
      const reordered = reorder(
        getList(source.droppableId),
        source.index,
        destination.index
      );

      updateDraggableStateAndProps({ module, sourceId: source.droppableId, destinationId: destination.droppableId, reordered });
    } else {
      const reordered = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination
      );

      updateDraggableStateAndProps({ module, sourceId: source.droppableId, destinationId: destination.droppableId, reordered });
    }
  };

  renderModuleLists = () => {
    const { semesters, updateDraggableList, showModal, modules: draggableList } = this.props;
    return (
      map(semesters, sem => {
        const moduleList = draggableList[sem.semesterId] !== undefined ? draggableList[sem.semesterId] : [];
        if (draggableList[sem.semesterId] === undefined) {
          const updated = draggableList;
          updated[sem.semesterId] = [];
          updateDraggableList(updated);
        }
        return <DraggableModulelist showModal={showModal} sem={sem} moduleList={moduleList} />
      })
    )
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <ScrollContainer>
        { this.renderModuleLists() }
        </ScrollContainer>
      </DragDropContext>
    );
  }
}

DraggableBoard.propTypes = {
  semesters: PropTypes.array.isRequired,
  // tags: PropTypes.array.isRequired,
  modules: PropTypes.object.isRequired,
  showModal: PropTypes.func.isRequired, // show Update semester modal
  updateDraggableList: PropTypes.func.isRequired,
  updateModulePosition: PropTypes.func.isRequired,
};

export default DraggableBoard;
