// src/contexts/TaskContext.js

import React, { createContext, useState } from 'react';

type TaskContextType = {
    selectedTaskList: any,
    setSelectedTaskList: any,
    selectedTask: any,
    setSelectedTask: any
}

export const TaskContext = createContext<TaskContextType>();

export const TaskProvider = ({ children }: any) => {
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