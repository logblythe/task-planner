import React from "react";
import {
  Box,
  Button,
  Group,
  Modal,
  Space,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import * as Yup from "yup";
import { ITask } from "./initial-data";

interface IProps {
  opened: boolean;
  onClose: VoidFunction;
  onCreateTask: (task: ITask) => void;
}

const schema = Yup.object().shape({
  title: Yup.string().min(2, "Required"),
});

const AddTaskModal: React.FC<IProps> = ({ opened, onClose, onCreateTask }) => {
  const form = useForm({
    initialValues: {
      title: "",
      description: "",
    },
    schema: yupResolver(schema),
  });

  const handleSubmit = form.onSubmit((values: typeof form.values) => {
    const { title, description } = values;
    const task: ITask = {
      id: Date.now().toString(),
      content: title,
      title,
      description,
    };
    onCreateTask(task);
    onClose();
  });

  return (
    <Modal
      title="Add new task"
      opened={opened}
      onClose={onClose}
      withCloseButton={true}
      closeOnClickOutside={false}
    >
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form onSubmit={handleSubmit}>
          <TextInput
            size="sm"
            label="Title"
            placeholder="Task title"
            {...form.getInputProps("title")}
          />
          <Space h="md" />
          <Textarea
            placeholder="Describe tasks"
            label="Description"
            autosize
            minRows={2}
            {...form.getInputProps("description")}
          />
          <Space h="md" />
          <Group position="center">
            <Button type="submit" fullWidth>
              Save
            </Button>
          </Group>
        </form>
      </Box>
    </Modal>
  );
};

export default AddTaskModal;
