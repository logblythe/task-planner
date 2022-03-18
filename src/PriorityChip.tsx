import { Chip } from "@mantine/core";
import React from "react";
import { Priority } from "./initial-data";
interface IProps {
  priority: Priority;
}
const PriorityChip: React.FC<IProps> = ({ priority }) => {
  switch (priority) {
    case "High": {
      return (
        <Chip value={priority} variant="filled" color="red" checked={true}>
          {priority}
        </Chip>
      );
    }
    case "Medium": {
      return (
        <Chip value={priority} variant="filled" color="green" checked={true}>
          {priority}
        </Chip>
      );
    }
    case "Low": {
      return (
        <Chip value={priority} variant="filled" color="blue" checked={true}>
          {priority}
        </Chip>
      );
    }
    default:
      return null;
  }
};

export default PriorityChip;
