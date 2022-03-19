import {
  Container,
  CSSObject,
  useMantineTheme,
  Group,
  Button,
  Title,
  Chip,
} from "@mantine/core";
import React, { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import TaskModal from "./TaskModal";
import { IColumn, ITask } from "./initial-data";
import Task from "./task";
import { useDisclosure } from "@mantine/hooks";

interface IProps {
  column: IColumn;
  tasks: ITask[];
  isDropDisabled: boolean;
  index: number;
  onCreateTask: (task: ITask, columnId: string) => void;
  onEdit: (task: ITask) => void;
  onDelete: (task: ITask, columnId: string) => void;
}

const Column: React.FC<IProps> = ({
  column,
  tasks,
  isDropDisabled,
  index,
  onCreateTask,
  onEdit,
  onDelete,
}) => {
  const theme = useMantineTheme();

  const containerStyles: CSSObject = {
    margin: theme.spacing.lg,
    // border: `1px solid ${
    //   theme.colorScheme === "dark" ? theme.colors.blue[6] : theme.colors.blue[3]
    // }`,
    borderRadius: 12,
    minWidth: "25%",
    // backgroundColor:
    //   theme.colorScheme === "dark"
    //     ? theme.colors.dark[5]
    //     : theme.colors.gray[1],
    // "&:hover": {
    //   backgroundColor:
    //     theme.colorScheme === "dark"
    //       ? theme.colors.dark[4]
    //       : theme.colors.gray[2],
    // },
  };
  const [opened, handlers] = useDisclosure(false);
  const [editTask, setEditTask] = useState<ITask>();

  const handleEdit = (task: ITask) => {
    setEditTask(task);
    handlers.open();
  };

  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <Container
          sx={containerStyles}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Chip size="xl" color="blue" variant="filled" checked={false}>
            <Title order={2} {...provided.dragHandleProps}>
              {column.title}
            </Title>
          </Chip>
          <Droppable
            droppableId={column.id}
            // type={column.id === "column-3" ? "done" : "active"}
            // isDropDisabled={true}
            // isDropDisabled={isDropDisabled}
          >
            {(provided, snapshot) => (
              <Group direction="column" py="sm" spacing="xl">
                <Group
                  direction="column"
                  py="sm"
                  spacing="sm"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  sx={(theme) => ({
                    background: snapshot.isDraggingOver
                      ? theme.colorScheme === "dark"
                        ? "DimGrey"
                        : "AliceBlue"
                      : "inherit",
                    transition: "background-color 0.2s ease",
                    minHeight: "100px",
                    width: "100%",
                    borderRadius: 16,
                  })}
                >
                  {tasks.map((task, index) => (
                    <Task
                      key={task.id}
                      task={task}
                      index={index}
                      onEdit={() => handleEdit(task)}
                      onDelete={() => onDelete(task, column.id)}
                    />
                  ))}
                  {provided.placeholder}
                </Group>
                <Button
                  fullWidth
                  size="lg"
                  radius="lg"
                  variant="filled"
                  onClick={() => handlers.open()}
                >
                  Add card
                </Button>
                <TaskModal
                  key={editTask?.id}
                  opened={opened}
                  onClose={() => handlers.close()}
                  initialValues={{
                    id: editTask?.id || "",
                    title: editTask?.title || "",
                    description: editTask?.description || "",
                    priority: editTask?.priority || "",
                  }}
                  onSave={(task) => {
                    editTask ? onEdit(task) : onCreateTask(task, column.id);
                    setEditTask(undefined);
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
