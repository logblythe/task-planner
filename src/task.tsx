import { Draggable } from "react-beautiful-dnd";
import { Group, Paper, Text, Title } from "@mantine/core";
import { ITask } from "./initial-data";
import PriorityChip from "./PriorityChip";

const Task = (props: { task: ITask; index: number }) => {
  // const isDragDisabled = props.task.id === "task-1";
  const isDragDisabled = false;
  return (
    <Draggable
      draggableId={props.task.id}
      index={props.index}
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
              {props.task.title && <Title order={3}>{props.task.title}</Title>}
              {props.task.content && <Text>{props.task.content}</Text>}
              <PriorityChip priority={props.task.priority} />
            </Group>
          </Paper>
        );
      }}
    </Draggable>
  );
};

export default Task;
