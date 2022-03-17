import {
  Container,
  CSSObject,
  useMantineTheme,
  Group,
  Button,
  Title,
} from "@mantine/core";
import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Plus } from "tabler-icons-react";
import AddTaskModal from "./AddTaskModal";
import { IColumn, ITask } from "./initial-data";
import Task from "./task";

const Column = (props: {
  column: IColumn;
  tasks: ITask[];
  isDropDisabled: boolean;
  index: number;
  onCreateTask: (task: ITask, columnId: string) => void;
}) => {
  const theme = useMantineTheme();

  const containerStyles: CSSObject = {
    margin: theme.spacing.lg,
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.blue[6] : theme.colors.blue[3]
    }`,
    borderRadius: 2,
    minWidth: "25%",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[5]
        : theme.colors.gray[1],
    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2],
    },
  };

  const [opened, setOpened] = React.useState(false);

  const showAddModal = () => setOpened(true);

  const closeAddModal = () => setOpened(false);

  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided) => (
        <Container
          sx={containerStyles}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Title {...provided.dragHandleProps}>{props.column.title}</Title>
          <Droppable
            droppableId={props.column.id}
            // type={props.column.id === "column-3" ? "done" : "active"}
            // isDropDisabled={true}
            // isDropDisabled={props.isDropDisabled}
          >
            {(provided, snapshot) => (
              <Group direction="column" py="sm" spacing="xl">
                <Group
                  direction="column"
                  py="sm"
                  spacing="sm"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    background: snapshot.isDraggingOver ? "red" : "inherit",
                    transition: "background-color 0.2s ease",
                    minHeight: "100px",
                    width: "100%",
                  }}
                >
                  {props.tasks.map((task, index) => (
                    <Task key={task.id} task={task} index={index} />
                  ))}
                  {provided.placeholder}
                </Group>
                <Button
                  fullWidth
                  variant="outline"
                  leftIcon={<Plus />}
                  onClick={showAddModal}
                >
                  Card
                </Button>
                <AddTaskModal
                  opened={opened}
                  onClose={closeAddModal}
                  onCreateTask={(task) => {
                    props.onCreateTask(task, props.column.id);
                  }}
                />
              </Group>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  );
};

export default Column;
