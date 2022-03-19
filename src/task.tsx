import { Draggable } from "react-beautiful-dnd";
import { Group, Paper, Text, Title, Space, ActionIcon } from "@mantine/core";
import { Pencil, TrashX } from "tabler-icons-react";
import { ITask } from "./initial-data";
import PriorityChip from "./PriorityChip";

interface IProps {
  task: ITask;
  index: number;
  onEdit: (task: ITask) => void;
  onDelete: (task: ITask) => void;
}

const Task: React.FC<IProps> = ({ task, index, onEdit, onDelete }) => {
  // const isDragDisabled = props.task.id === "task-1";
  const isDragDisabled = false;
  return (
    <Draggable
      draggableId={task.id}
      index={index}
      isDragDisabled={isDragDisabled}
    >
      {(provided, snapshot) => {
        return (
          <Paper
            shadow="xl"
            radius="md"
            p="md"
            withBorder
            sx={(theme) => ({
              width: "100%",
              borderRadius: 8,
            })}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <Group direction="column" spacing={8}>
              <Group position="apart" style={{ width: "100%" }}>
                <Title order={3}>{task.title}</Title>
                <Group spacing={2}>
                  <ActionIcon onClick={() => onEdit(task)}>
                    <Pencil size={24} />
                  </ActionIcon>
                  <ActionIcon onClick={() => onDelete(task)} color="red">
                    <TrashX size={24} />
                  </ActionIcon>
                </Group>
              </Group>
              {task.content && <Text>{task.content}</Text>}
              <Space h="md" />
              <PriorityChip priority={task.priority} />
            </Group>
          </Paper>
        );
      }}
    </Draggable>
  );
};

export default Task;
