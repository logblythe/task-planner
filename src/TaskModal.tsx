import React from "react";
import {
  Box,
  Button,
  Group,
  Modal,
  NativeSelect,
  Space,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import * as Yup from "yup";
import { ITask, Priority } from "./initial-data";

interface IProps {
  opened: boolean;
  onClose: VoidFunction;
  onSave: (task: ITask) => void;
  initialValues: any;
}

const schema = Yup.object().shape({
  title: Yup.string().min(2, "Required"),
  priority: Yup.string().required("Required"),
});

const TaskModal: React.FC<IProps> = ({
  initialValues,
  opened,
  onClose,
  onSave,
}) => {
  const form = useForm({
    initialValues: initialValues,
    schema: yupResolver(schema),
  });

  const handleSubmit = form.onSubmit((values: typeof form.values) => {
    const { title, description, priority } = values;
    const updatedTask: ITask = {
      id: initialValues.id || Date.now().toString(),
      title,
      content: description,
      description: description,
      priority: priority as Priority,
    };
    onSave(updatedTask);
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
          <NativeSelect
            data={["High", "Medium", "Low"]}
            placeholder="Pick one"
            label="Priority"
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

export default TaskModal;
