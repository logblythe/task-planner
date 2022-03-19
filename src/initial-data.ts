export type Priority = "High" | "Medium" | "Low";
export interface ITask {
  id: string;
  content: string;
  title?: string;
  description?: string;
  priority: Priority;
  date: string;
}

export interface IColumn {
  id: string;
  title: string;
  taskIds: string[];
}

export interface IInitialData {
  tasks: {
    [task: string]: ITask;
  };
  columns: {
    [column: string]: IColumn;
  };
  columnOrder: string[];
}

const initialData: IInitialData = {
  tasks: {
    "task-1": {
      id: "task-1",
      content: "Take out the garbage",
      title: "Take out the garbage",
      description: "Take out the garbage",
      priority: "Low",
      date: Date().toString(),
    },
    "task-2": {
      id: "task-2",
      content: "Watch my favorite show",
      title: "Watch my favorite show",
      description: "Watch my favorite show",
      priority: "Low",
      date: Date().toString(),
    },
    "task-3": {
      id: "task-3",
      content: "Charge my phone",
      title: "Charge my phone",
      description: "Charge my phone",
      priority: "Low",
      date: Date().toString(),
    },
    "task-4": {
      id: "task-4",
      content: "Cook dinner",
      title: "Cook dinner",
      description: "Cook dinner",
      priority: "Low",
      date: Date().toString(),
    },
    "task-5": {
      id: "task-5",
      content: "Eat dinner",
      title: "Eat dinner",
      description: "Eat dinner",
      priority: "Low",
      date: Date().toString(),
    },
    "task-6": {
      id: "task-6",
      content: "Wake up early",
      title: "Wake up early",
      description: "Wake up early",
      priority: "Low",
      date: Date().toString(),
    },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To do",
      taskIds: ["task-1", "task-2", "task-3", "task-4", "task-5", "task-6"],
    },
    "column-2": {
      id: "column-2",
      title: "In Progress",
      taskIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "Done",
      taskIds: [],
    },
  },
  // // Facilitate reordering of the columns
  columnOrder: ["column-1", "column-2", "column-3"],
};

export default initialData;
