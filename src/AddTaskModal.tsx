import React from "react";
import {
  Autocomplete,
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
  priority: Yup.string().required("Required"),
});

const AddTaskModal: React.FC<IProps> = ({ opened, onClose, onCreateTask }) => {
  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      priority: "",
    },
    schema: yupResolver(schema),
  });

  const handleSubmit = form.onSubmit((values: typeof form.values) => {
    debugger;
    const { title, description } = values;
    const task: ITask = {
      id: Date.now().toString(),
      title,
      content: description,
      description,
      priority: "High",
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
          <Autocomplete
            label="Priority"
            placeholder="Pick one"
            data={["High", "Medium", "Low"]}
            {...form.getInputProps("priority")}
          />
          <Space h="md" />
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
