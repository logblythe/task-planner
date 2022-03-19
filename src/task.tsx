import { Draggable } from "react-beautiful-dnd";
import {
  Group,
  Paper,
  Text,
  Title,
  Space,
  ActionIcon,
  Chip,
} from "@mantine/core";
import { Pencil, TrashX } from "tabler-icons-react";
import dayjs from "dayjs";
import { ITask } from "./initial-data";
import PriorityChip from "./PriorityChip";

interface IProps {
  task: ITask;
  index: number;
  onEdit: (task: ITask) => void;
  onDelete: (task: ITask) => void;
}

const Task: React.FC<IProps> = ({ task, index, onEdit, onDelete }) => {
  const taskDate = new Date(task?.date);
  const currentDate = new Date();
  const differenceInDays = dayjs(currentDate).diff(taskDate, "day");
  const isDragDisabled = differenceInDays > 0;
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
              background: isDragDisabled
                ? theme.colorScheme === "light"
                  ? theme.colors.red[2]
                  : theme.colors.pink[8]
                : theme.colorScheme === "light"
                ? theme.colors.gray[0]
                : theme.colors.dark[4],
            })}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <Group direction="column" spacing={8}>
              <Group position="apart" style={{ width: "100%" }}>
                <Title order={3}>{task.title}</Title>
                <Group spacing={2}>
                  {!isDragDisabled ? (
                    <ActionIcon onClick={() => onEdit(task)}>
                      <Pencil size={24} />
                    </ActionIcon>
                  ) : null}
                  <ActionIcon onClick={() => onDelete(task)} color="red">
                    <TrashX size={24} />
                  </ActionIcon>
                </Group>
              </Group>
              <Text>{task.content}</Text>
              <Space h="md" />
              <Group position="apart" style={{ width: "100%" }}>
                {!isDragDisabled ? (
                  <PriorityChip priority={task.priority} />
                ) : (
                  <Chip variant="filled" checked={true}>
                    Expired
                  </Chip>
                )}

                {task?.date ? (
                  <Text weight={500}>
                    {dayjs(new Date(task.date)).format("MMM DD, YYYY")}
                  </Text>
                ) : null}
              </Group>
            </Group>
          </Paper>
        );
      }}
    </Draggable>
  );
};

export default Task;
