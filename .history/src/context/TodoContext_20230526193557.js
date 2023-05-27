// import React, { createContext, useState } from 'react';

// export const TodoContext = createContext();

// export const TodoProvider = ({ children }) => {



//     // Set up state variables
//     const [selectedTaskList, setSelectedTaskList] = useState(null);
//     const [selectedTask, setSelectedTask] = useState(null);
//     const [addTaskMode, setAddTaskMode] = useState(false);



//     return (
//         <TodoContext.Provider value={{
//             // Provide state variables and setter functions
//             selectedTaskList,
//             setSelectedTaskList,
//             selectedTask,
//             setSelectedTask,
//             addTaskMode,
//             setAddTaskMode,
//         }}>
//             {children}
//         </TodoContext.Provider>
//     );
// };

import React, { createContext, useState } from "react";
import todoListData from "../data/todoListData";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  // Set up state variables
  const [selectedTask, setSelectedTask] = useState(null);
  const [addTaskMode, setAddTaskMode] = useState(false);

  // Check if task list data exists in local storage
  const taskListsJSON = localStorage.getItem("taskLists");
  // If there's no data in Local Storage, store the initial data
  if (taskListsJSON === null) {
    // Store the initial task lists in Local Storage
    localStorage.setItem("taskLists", JSON.stringify(todoListData));
}

// Parse the data from local storage or use the initial task lists
const initialData =
  taskListsJSON !== null ? JSON.parse(taskListsJSON) : todoListData;

// Set up state with the initial data
const [taskLists, setTaskLists] = useState(initialData);
const [selectedTaskList, setSelectedTaskList] = useState(null);

const handleTaskListClick = (taskList) => {
  setSelectedTaskList(taskList);
};

const handleTaskAdd = (listId, newTask) => {
  // Implement the logic to add a new task to a specific task list
  const taskListToUpdate = taskLists.find(
    (taskList) => taskList.listId === listId
  );

  if (!taskListToUpdate) {
    console.error("Task list not found for the selected task");
    return;
  }

  // Construct taskId for the new task
  const newTaskId = `${new Date().getTime()}-${Math.random()
    .toString(36)
    .substr(2, 9)}`;
  const updatedTask = {
    ...newTask, taskId: newTaskId,
    createdDate: new Date(),
    completed: false,
  };

  const updatedTaskList = {
    ...taskListToUpdate,
    tasks: [...taskListToUpdate.tasks, updatedTask],
  };

  const updatedTaskLists = taskLists.map((taskList) =>
    taskList.listId === listId ? updatedTaskList : taskList
  );

  // Update the state with the new taskLists array
  setTaskLists(updatedTaskLists);

  // Update the local storage with the new taskLists array
  localStorage.setItem("taskLists", JSON.stringify(updatedTaskLists));
};

const handleTaskUpdate = (updatedTask) => {
  // Find the task list containing the current task
  const taskListToUpdate = taskLists.find(
    (taskList) => taskList.listId === selectedTaskList.listId
  );

  if (!taskListToUpdate) {
    console.error("Task list not found for the selected task");
    return;
  }

  // Find the index of the task to be updated within its list
  const taskIndex = taskListToUpdate.tasks.findIndex(
    (task) => task.taskId === updatedTask.taskId
  );

  if (taskIndex < 0) {
    console.error("Task not found in the selected task list");
    return;
  }
  const updatedTaskList = {
    ...taskListToUpdate,
    tasks: [
      ...taskListToUpdate.tasks.slice(0, taskIndex),
      updatedTask,
      ...taskListToUpdate.tasks.slice(taskIndex + 1),
    ],
  };
  const updatedTaskLists = taskLists.map((taskList) =>
    taskList.listId === selectedTaskList.listId ? updatedTaskList : taskList
  );

  // Update the state with the new taskLists array
  setTaskLists(updatedTaskLists);

  // Update the local storage with the new taskLists array
  localStorage.setItem("taskLists", JSON.stringify(updatedTaskLists));
};

return (
  <TodoContext.Provider
    value={{
      selectedTask,
      setSelectedTask,
      addTaskMode,
      setAddTaskMode,
      taskLists,
      setTaskLists,
      selectedTaskList,
      setSelectedTaskList,
      handleTaskListClick,
      handleTaskAdd,
      handleTaskUpdate,
    }}
  >
    {children}
  </TodoContext.Provider>
);
};