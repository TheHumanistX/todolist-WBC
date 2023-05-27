import React, { createContext, useState } from 'react';

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
    // Set up state variables
    const [selectedTaskList, setSelectedTaskList] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);
    const [addingTask, setAddingTask] = useState(false); 


    return (
        <TodoContext.Provider value={{ 
            // Provide state variables and setter functions
            selectedTaskList, setSelectedTaskList, 
            selectedTask, setSelectedTask,
            addingTask, setAddingTask
        }}>
            {children}
        </TodoContext.Provider>
    );
};