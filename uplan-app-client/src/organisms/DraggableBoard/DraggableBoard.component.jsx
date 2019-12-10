import React, {PureComponent} from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import PropTypes from "prop-types";
import { map, find, get } from "lodash"; // TODO: Use lazy loading https://reactjs.org/docs/code-splitting.html
import styled from 'styled-components';

import DraggableModulelist from '../../molecules/DraggableModuleList/DraggableModuleList';
import { reorder, move } from "../../utils/DraggableUtils";


const ScrollContainer = styled.div`
  display: flex;
  overflow: scroll;
  padding: 1rem 1rem 0 0;
  background-color: white;
  @media only screen and (min-width: 768px) {
    height: 70vh;
    min-width: 100%;
  }
`;

/**
 * To optimize performance without rendering all the modules/semesters when we just want to drag semester
 * - to change background color etc (update snapshot component)
 * */
class InnerSemList extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { semesters, modules, alt } = this.props;
    return !(nextProps.semesters === semesters &&
      nextProps.modules === modules &&
      nextProps.alt === alt);

  }

  render() {
    const { semesters, showModal, modules: draggableList } = this.props;
    return (
      map(semesters, sem => {
        const moduleList = get(draggableList, `${sem.semesterId}`, []);
        return <DraggableModulelist key={`${sem.semesterId}-moduleList`} showModal={showModal} sem={sem} moduleList={moduleList} />
      })
    )
  }
}

class DraggableBoard extends PureComponent {
  constructor(props) {
    super(props);

    this.getList = this.getList.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.updateDraggableStateAndProps = this.updateDraggableStateAndProps.bind(this);
  }

  // Get module list for a particular semester
  getList = semId => get(this.props.modules, `${semId}`, []);

  // Update local state draggableList and propagate changes to store modules
  updateDraggableStateAndProps = ({ module, source, destination }) => {
    const { getList, props: { modules } } = this;
    let reordered;

    // TODO: Not sure to disable this as won't be stored in db (unless implement order)
    // Ignore this for now
    if (source.droppableId === destination.droppableId) {
      reordered = reorder(
        getList(source.droppableId),
        source.index,
        destination.index
      );
      modules[source.droppableId] = reordered;
    } else {
      reordered = move(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination
      );
      modules[source.droppableId] = reordered[source.droppableId];
      modules[destination.droppableId] = reordered[destination.droppableId];
    }

    // Use alt to Hack, update view fast without deep cloning
    this.props.updateModulePosition(module);
    this.props.updateDraggableList(modules);
  };

  onDragEnd = result => {
    const { source, destination } = result;
    const { getList, updateDraggableStateAndProps } = this;

    // destination == null when drop outside of the list
    if (!destination) return;
    if (source.droppableId === destination.droppableId) return;

    // Update the semesterId of module
    const module = {
      // module which has been dragged
      ...find(getList(source.droppableId), mod => mod.moduleId === result.draggableId),
      semesterId: destination.droppableId,
    };

    updateDraggableStateAndProps({ module, source, destination });
  };

  render() {
    const { modules, semesters, alt, showModal } = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <ScrollContainer>
          <InnerSemList modules={modules} semesters={semesters} alt={alt} showModal={showModal}/>
        </ScrollContainer>
      </DragDropContext>
    );
  }
}

DraggableBoard.propTypes = {
  semesters: PropTypes.array.isRequired,
  alt: PropTypes.bool.isRequired,
  // tags: PropTypes.array.isRequired,
  modules: PropTypes.object.isRequired,
  showModal: PropTypes.func.isRequired, // show Update semester modal
  updateDraggableList: PropTypes.func.isRequired,
  updateModulePosition: PropTypes.func.isRequired,
};

export default DraggableBoard;
