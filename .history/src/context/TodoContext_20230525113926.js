import React, { createContext, useState } from 'react';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [selectedTaskList, setSelectedTaskList] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);

    return (
        <TaskContext.Provider value={{ 
            selectedTaskList, setSelectedTaskList, 
            selectedTask, setSelectedTask 
        }}>
            {children}
        </TaskContext.Provider>
    );
};
