import React from "react";
import {
  DragDropContext,
  DragStart,
  DragUpdate,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import styled from "styled-components";
import initialData, { IInitialData, ITask } from "./initial-data";
import Column from "./column";
import { useLocalStorage } from "@mantine/hooks";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const BoardChild = () => {
  const [state, setState] = useLocalStorage<IInitialData>({
    key: "state-data",
    defaultValue: initialData,
  });

  const [homeIndex, setHomeIndex] = React.useState(0);
  const { tasks, columns, columnOrder } = state;

  // const handleDragStart = () => {
  //   document.body.style.color = "orange";
  //   document.body.style.transition = `background-color 0.2s ease`;
  // };

  const handleDragStart = (start: DragStart) => {
    const startColumn = state.columnOrder.indexOf(start.source.droppableId);
    setHomeIndex(startColumn);
  };

  const handleDragUpdate = (update: DragUpdate) => {
    const { destination } = update;
    const opacity = destination
      ? destination.index / Object.keys(tasks).length
      : 0;
    document.body.style.background = `rgba(153, 141, 217, ${opacity})`;
  };

  const handleDragEnd = (result: DropResult) => {
    document.body.style.color = "inherit";
    document.body.style.background = "inherit";
    setHomeIndex(0);
    const { source, destination, draggableId, type } = result;
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      const newColumnOrder = Array.from(state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);
      const newState = { ...state, columnOrder: newColumnOrder };
      setState(newState);
      return;
    }

    //last position source index
    //new position destination index

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];
    if (start === finish) {
      const newTaskIds = [...start.taskIds];
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = { ...start, taskIds: newTaskIds };
      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [start.id]: newColumn,
        },
      };
      setState(newState);
      return;
    }
    //Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = { ...start, taskIds: startTaskIds };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = { ...finish, taskIds: finishTaskIds };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [start.id]: newStart,
        [finish.id]: newFinish,
      },
    };

    setState(newState);
  };

  const handleCreateTask = (task: ITask, columnId: string) => {
    const newTasks = { ...state.tasks, [task.id]: task };
    const activeColumn = state.columns[columnId];
    const newTaskIds = [...activeColumn.taskIds, task.id];
    const newActiveColumn = { ...activeColumn, taskIds: newTaskIds };
    const newState = {
      ...state,
      tasks: newTasks,
      columns: {
        ...state.columns,
        [columnId]: newActiveColumn,
      },
    };
    setState(newState);
  };

  const handleEditTask = (task: ITask) => {
    const newState = { ...state, tasks: { ...state.tasks, [task.id]: task } };
    setState(newState);
  };

  const handleDeleteTask = (task: ITask, columnId: string) => {
    const { [task.id]: _, ...res } = state.tasks;
    const activeColumn = state.columns[columnId];
    const newTaskIds = [...activeColumn.taskIds].filter(
      (taskId) => taskId !== task.id
    );
    const newActiveColumn = { ...activeColumn, taskIds: newTaskIds };
    const newState = {
      ...state,
      tasks: res,
      columns: {
        ...state.columns,
        [columnId]: newActiveColumn,
      },
    };
    setState(newState);
  };

  return (
    <DragDropContext
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragUpdate={handleDragUpdate}
    >
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <>
            <Container {...provided.droppableProps} ref={provided.innerRef}>
              {columnOrder.map((columnId, index) => {
                const column = columns[columnId];
                const taskList = column.taskIds.map((taskId) => tasks[taskId]);
                const isDropDisabled = index < homeIndex;
                return (
                  <Column
                    key={column.id}
                    column={column}
                    tasks={taskList}
                    isDropDisabled={isDropDisabled}
                    index={index}
                    onCreateTask={handleCreateTask}
                    onEdit={handleEditTask}
                    onDelete={handleDeleteTask}
                  />
                );
              })}
              {provided.placeholder}
            </Container>
          </>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default BoardChild;
