import React, { createContext, useState } from 'react';

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
    // Set up state variables
    const [selectedTaskList, setSelectedTaskList] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);
    const [displayAddTaskForm, setDisplayAddTaskForm] = useState(false); 


    return (
        <TodoContext.Provider value={{ 
            // Provide state variables and setter functions
            selectedTaskList, setSelectedTaskList, 
            selectedTask, setSelectedTask,
            displayAddTaskForm, setDisplayAddTaskForm
        }}>
            {children}
        </TodoContext.Provider>
    );
};