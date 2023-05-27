import React, { createContext, useState } from 'react';

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
    // Set up state variables
    const [taskLists, setTaskLists] = useState(
        JSON.parse(localStorage.getItem("taskLists")) || {}
      );
    const [selectedTaskList, setSelectedTaskList] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);
    const [displayAddTaskForm, setDisplayAddTaskForm] = useState(false); 

    const handleTaskUpdate = (updatedTask) => {
        const updatedTaskList = selectedTaskList.tasks.map((task) =>
          task.taskId === updatedTask.taskId ? updatedTask : task
        );
        setSelectedTaskList({ ...selectedTaskList, tasks: updatedTaskList });
        localStorage.setItem(
          "taskLists",
          JSON.stringify({ ...taskLists, [selectedTaskList.listId]: selectedTaskList })
        );
      };
    
      const handleAddTask = (newTask) => {
        const updatedTaskList = selectedTaskList.tasks.concat(newTask);
        setSelectedTaskList({ ...selectedTaskList, tasks: updatedTaskList });
        localStorage.setItem(
          "taskLists",
          JSON.stringify({ ...taskLists, [selectedTaskList.listId]: selectedTaskList })
        );
        setDisplayAddTaskForm(false);
      };

    return (
        <TodoContext.Provider value={{ 
            // Provide state variables and setter functions
            taskLists,
            setTaskLists,
            selectedTaskList,
            setSelectedTaskList,
            selectedTask,
            setSelectedTask,
            displayAddTaskForm,
            setDisplayAddTaskForm,
            handleTaskUpdate,
            handleAddTask,
        }}>
            {children}
        </TodoContext.Provider>
    );
};