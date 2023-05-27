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

import React, { createContext, useState, useEffect } from 'react';
import todoListData from '../data/todoListData';

export const TodoContext = createContext();

const initialData = () => {
    const taskListsJSON = localStorage.getItem('taskLists');

    if (taskListsJSON === null) {
        localStorage.setItem('taskLists', JSON.stringify(todoListData));
    }

    return taskListsJSON !== null ? JSON.parse(taskListsJSON) : todoListData;
}

export const TodoProvider = ({ children }) => {
    // Set up state variables
    const [selectedTaskList, setSelectedTaskList] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);
    const [addTaskMode, setAddTaskMode] = useState(false);

    // Move initial data retrieval to the context provider
    useEffect(() => {
        console.log('TodoProvider component mounted');
        return () => {
            console.log('TodoProvider component unmounted');
        };
    }, []);

    // Initialize the task lists 
    const [taskLists, setTaskLists] = useState(initialData());

    // Add helper functions such as handleTaskAdd and handleTaskUpdate here

    const handleTaskAdd = (listId, newTask) => {
        // Implement the logic to add a new task to a specific task list
        const taskListToUpdate = taskLists.find((taskList) => taskList.listId === listId);

        if (!taskListToUpdate) {
            console.error('Task list not found for the selected task');
            return;
        }

        // Construct taskId for the new task
        const newTaskId = `${new Date().getTime()}-${Math.random().toString(36).substr(2, 9)}`;
        const updatedTask = { ...newTask, taskId: newTaskId, createdDate: new Date(), completed: false };

        const updatedTaskList = {
            ...taskListToUpdate,
            tasks: [...taskListToUpdate.tasks, updatedTask],
        };

        const updatedTaskLists = taskLists.map((taskList) =>
            taskList.listId === listId ? updatedTaskList : task List
        );

	  // Update the state with the	new	taskLists array	
	set	Task Lists(updated Task Lists);

    }
    // Update the local storage with the new taskLists array
    localStorage.setItem("taskLists", JSON.stringify(updatedTaskLists));

    
const handleTaskListClick = (taskList) => {
    console.log('handleTaskListClick entered in TodoContext');
    setSelectedTaskList(taskList);
  };
  
  return (
    <TodoContext.Provider
      value={{
        // Provide state variables and setter functions
        selectedTaskList,
        setSelectedTaskList,
        selectedTask,
        setSelectedTask,
        addTaskMode,
        setAddTaskMode,
        
        // Add helper functions to your context state
        handleTaskAdd: handle_Task_Add FunctionName(),
          ...other_functions_as_needed...
      }}
    >
      {children}
    </TodoContext.Provider>
  );
    }