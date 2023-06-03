// Importing required modules and data
import React, { createContext, useState, useEffect } from "react";
import todoListData from "../data/todoListData";

// Creating Context for our Todo App
export const TodoContext = createContext();

// Defining TodoProvider which will provide state and handle events to child components
export const TodoProvider = ({ children }) => {
    // State variables
    const [selectedTask, setSelectedTask] = useState(null);
    const [addTaskMode, setAddTaskMode] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [taskName, setTaskName] = useState("");
    const [dueDate, setDueDate] = useState(null);
    const [description, setDescription] = useState("");
    const [open, setOpen] = useState(false);
    const [openTaskListEdit, setOpenTaskListEdit] = useState({ open: false, listId: null });

    // Initial load of task lists data
    const [taskLists, setTaskLists] = useState(() => {
        // Fetches task list data from local storage
        const taskListsJSON = localStorage.getItem("taskLists");
        
        // Returns parsed data from local storage or default data if local storage is null
        return taskListsJSON !== null ? JSON.parse(taskListsJSON) : todoListData;
    });

    // Save to local storage whenever taskLists updates
    useEffect(() => {
        localStorage.setItem("taskLists", JSON.stringify(taskLists));
    }, [taskLists]);

    const [selectedTaskList, setSelectedTaskList] = useState(null);

    // Helper function to handle state transition for editing task
    const handleEdit = () => {
        setEditMode(true);
    };

    // Helper function to handle task list selection
    const handleTaskListClick = (taskList) => {
        setSelectedTaskList(taskList);
    };


    const handleListAdd = (newList) => {
        // Create a new listId for the new list
        const newListId = taskLists.length + 1;

        // Add new list to the existing lists
        const updatedTaskLists = [...taskLists, { ...newList, listId: newListId, tasks: [] }];

        // Update the state with the new taskLists array
        setTaskLists(updatedTaskLists);

        // Update the local storage with the new taskLists array
        localStorage.setItem("taskLists", JSON.stringify(updatedTaskLists));
    };

    // This function takes in a listId and opens the task list edit dialog with that id
    const handleEditTaskList = (listId) => {
        // Set the openTaskListEdit state to open the dialog with the given listId
        setOpenTaskListEdit({ open: true, listId });
    };

    // This function closes the task list edit dialog
    const handleCloseTaskListEdit = () => {
        // Set the openTaskListEdit state to close the dialog and reset the listId
        setOpenTaskListEdit({ open: false, listId: null });
    };

    // This function takes in a listId and a newTitle and updates the title of the task list with that id
    const handleListTitleUpdate = (listId, newTitle) => {
        // Map over the taskLists array and update the listName property of the task list with the given listId
        const updatedTaskLists = taskLists.map((taskList) => {
            if (taskList.listId === listId) {
                return { ...taskList, listName: newTitle };
            }
            return taskList;
        });

        // Update the state with the new taskLists array
        setTaskLists(updatedTaskLists);

        // Update the local storage with the new taskLists array
        localStorage.setItem("taskLists", JSON.stringify(updatedTaskLists));
    };
    // This function takes in a listId and deletes the task list with that id from the taskLists state array
    const handleListDelete = (listId) => {
        // Filter out the task list with the given listId from the taskLists array
        const updatedTaskLists = taskLists.filter((taskList) => taskList.listId !== listId);

        // Update the state with the new taskLists array
        setTaskLists(updatedTaskLists);

        // Update the local storage with the new taskLists array
        localStorage.setItem("taskLists", JSON.stringify(updatedTaskLists));
    };

    // Task functions helper functions
    const taskListUpdate = (listId) => {

        // Find the task list containing the current task
        const taskListToUpdate = taskLists.find(
            (taskList) => taskList.listId === listId
        );

        if (!taskListToUpdate) {
            console.error("Task list not found for the selected task");
            return;
        }

        return taskListToUpdate;
    }


    const handleTaskAdd = (listId, newTask) => {

        const taskListToUpdate = taskListUpdate(listId);

        const uncompletedTasks = taskListToUpdate.tasks.filter((task) => !task.completed);
        const completedTasks = taskListToUpdate.tasks.filter((task) => task.completed);

        // Add the new task at the end of the uncompleted tasks
        const updatedUncompletedTasks = [
            ...uncompletedTasks,
            { ...newTask, taskId: uncompletedTasks.length + 1 },
        ];

        // Update the taskIds for the completed tasks
        const updatedCompletedTasks = completedTasks.map((task, index) => {
            return { ...task, taskId: updatedUncompletedTasks.length + index + 1 };
        });

        // Merge the updated uncompleted tasks and completed tasks
        const updatedTasks = [...updatedUncompletedTasks, ...updatedCompletedTasks];

        const updatedTaskList = {
            ...taskListToUpdate,
            tasks: updatedTasks,
        };

        const updatedTaskLists = taskLists.map((taskList) =>
            taskList.listId === listId ? updatedTaskList : taskList
        );

        // Update the state with the new taskLists array
        setTaskLists(updatedTaskLists);

        if (selectedTaskList && selectedTaskList.listId === listId) {
            setSelectedTaskList(updatedTaskList);
        }

        // Update the local storage with the new taskLists array
        localStorage.setItem("taskLists", JSON.stringify(updatedTaskLists));

        // set the selectedTask to the newly added task so it is viewed immediately on confirm
        setSelectedTask(newTask);
    };

    const handleTaskUpdate = (listId, updatedTask) => {

        const taskListToUpdate = taskListUpdate(listId);

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

        if (selectedTaskList && selectedTaskList.listId === listId) {
            setSelectedTaskList(updatedTaskList);
        }

        // Update the local storage with the new taskLists array
        localStorage.setItem("taskLists", JSON.stringify(updatedTaskLists));

        // Setting editMode to false so that TaskDetails will render TaskView to display updated task after edit
        setEditMode(false);

        // set the selectedTask to the updated task so it is viewed immediately on confirm
        setSelectedTask(updatedTask);
    };

    const handleTaskDelete = (listId, taskId) => {

        const taskListToUpdate = taskListUpdate(listId);

        // Remove the task from the task list
        const updatedTaskList = {
            ...taskListToUpdate,
            tasks: taskListToUpdate.tasks.filter((task) => task.taskId !== taskId),
        };

        // Adjust the taskIds of the remaining tasks
        const updatedTasks = updatedTaskList.tasks.map((task, index) => {
            return { ...task, taskId: index + 1 };
        });

        // Replace the tasks in updatedTaskList with the updatedTasks
        updatedTaskList.tasks = updatedTasks;

        const updatedTaskLists = taskLists.map((taskList) =>
            taskList.listId === listId ? updatedTaskList : taskList
        );

        // Update the state with the new taskLists array
        setTaskLists(updatedTaskLists);

        if (selectedTaskList && selectedTaskList.listId === listId) {
            setSelectedTaskList(updatedTaskList);
        }

        // Update the local storage with the new taskLists array
        localStorage.setItem("taskLists", JSON.stringify(updatedTaskLists));
        setSelectedTask(null);
    };

    // This function toggles the completed status of a task in a task list
    const handleTaskToggleCompleted = (listId, taskId) => {

        // Get the task list to update
        const taskListToUpdate = taskListUpdate(listId);

        // Find the task to update
        const taskToUpdate = taskListToUpdate.tasks.find((task) => task.taskId === taskId);

        // If the task is not found, log an error and return
        if (!taskToUpdate) {
            console.error("Task not found in the selected task list");
            return;
        }

        // Create a copy of the task with the completed status toggled
        const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };

        let sortedTasks;

        // If the task is being marked as completed, move it to the end of the list
        if (updatedTask.completed) {
            const remainingTasks = taskListToUpdate.tasks
                .filter((task) => task.taskId !== taskId)
                .map((task, index) => {
                    return { ...task, taskId: index + 1 };
                });

            sortedTasks = [
                ...remainingTasks,
                { ...updatedTask, taskId: remainingTasks.length + 1 },
            ];

        } else {
            // If the task is being marked as uncompleted, move it to the correct position

            // Get the remaining uncompleted tasks
            const remainingUncompletedTasks = taskListToUpdate.tasks.filter(
                (task) => !task.completed && task.taskId !== taskId
            );

            // Get the remaining completed tasks
            const remainingCompletedTasks = taskListToUpdate.tasks.filter(
                (task) => task.completed && task.taskId !== taskId
            );

            // Combine the remaining uncompleted tasks, the updated task, and the remaining completed tasks
            sortedTasks = [
                ...remainingUncompletedTasks,
                updatedTask,
                ...remainingCompletedTasks
            ].map((task, index) => {
                return { ...task, taskId: index + 1 };
            });
        }

        // Create a copy of the task list with the updated task
        const updatedTaskList = {
            ...taskListToUpdate,
            tasks: sortedTasks
        };

        // Create a copy of the task lists array with the updated task list
        const updatedTaskLists = taskLists.map((taskList) =>
            taskList.listId === listId ? updatedTaskList : taskList
        );

        // Update the state with the new task lists array
        setTaskLists(updatedTaskLists);

        // If the selected task list is the one being updated, update the selected task list state
        if (selectedTaskList && selectedTaskList.listId === listId) {
            setSelectedTaskList(updatedTaskList);
        }

        // Update the selected task state with the updated task
        setSelectedTask(updatedTask);

        // Update the local storage with the new task lists array
        localStorage.setItem("taskLists", JSON.stringify(updatedTaskLists));
    };

    console.log('TodoProvider rendering. Current selectedTask:', selectedTask);
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
                open,
                setOpen,
                openTaskListEdit,
                setOpenTaskListEdit,
                handleEdit,
                handleTaskListClick,
                handleListAdd,
                handleEditTaskList,
                handleCloseTaskListEdit,
                handleListTitleUpdate,
                handleListDelete,
                handleTaskAdd,
                handleTaskUpdate,
                handleTaskDelete,
                handleTaskToggleCompleted,
                editMode,
                setEditMode,
                taskName,
                setTaskName,
                dueDate,
                setDueDate,
                description,
                setDescription,
            }}
        >
            {children}
        </TodoContext.Provider>
    );
};