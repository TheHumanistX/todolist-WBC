import React, { createContext, useState } from 'react';

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
    const [selectedTaskList, setSelectedTaskList] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);

    return (
        <TodoContext.Provider value={{ 
            selectedTaskList, setSelectedTaskList, 
            selectedTask, setSelectedTask 
        }}>
            {children}
        </TodoContext.Provider>
    );
};
