import React, { createContext, useState } from "react";
import todoListData from "../data/todoListData";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
    // Set up state variables
    const [selectedTask, setSelectedTask] = useState(null);
    const [addTaskMode, setAddTaskMode] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [taskName, setTaskName] = useState("");
    const [dueDate, setDueDate] = useState(null);
    const [description, setDescription] = useState("");
    const [open, setOpen] = useState(false);
    const [openTaskListEdit, setOpenTaskListEdit] = useState({ open: false, listId: null });



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

    const handleEdit = () => {
        setEditMode(true);
    };

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

    const handleEditTaskList = (listId) => {
        setOpenTaskListEdit({ open: true, listId });
    };

    const handleCloseTaskListEdit = () => {
        setOpenTaskListEdit({ open: false, listId: null });
    };

    const handleListTitleUpdate = (listId, newTitle) => {
        const updatedTaskLists = taskLists.map((taskList) => {
            if (taskList.listId === listId) {
                return { ...taskList, listName: newTitle };
            }
            return taskList;
        });

        setTaskLists(updatedTaskLists);
        localStorage.setItem("taskLists", JSON.stringify(updatedTaskLists));
    };

    const handleListDelete = (listId) => {
        const updatedTaskLists = taskLists.filter((taskList) => taskList.listId !== listId);

        setTaskLists(updatedTaskLists);
        localStorage.setItem("taskLists", JSON.stringify(updatedTaskLists));
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

        const updatedTask = {
            ...newTask
        };

        const updatedTaskList = {
            ...taskListToUpdate,
            tasks: taskListToUpdate.tasks.concat(updatedTask),
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
        setSelectedTask(updatedTask);
    };

    const handleTaskUpdate = (listId, updatedTask) => {
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
        // Find the task list containing the task to be deleted
        const taskListToUpdate = taskLists.find((taskList) => taskList.listId === listId);

        if (!taskListToUpdate) {
            console.error("Task list not found for the selected task");
            return;
        }

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
        console.log('setSelectedTask called in deleteTask');
    };

    const handleTaskToggleCompleted = (listId, taskId) => {
        const taskListToUpdate = taskLists.find((taskList) => taskList.listId === listId);
    
        if (!taskListToUpdate) {
            console.error("Task list not found for the selected task");
            return;
        }
    
        const taskToUpdate = taskListToUpdate.tasks.find((task) => task.taskId === taskId);
    
        if (!taskToUpdate) {
            console.error("Task not found in the selected task list");
            return;
        }
    
        const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };
    
        // If the task is completed, move it to the end of the list
        if (updatedTask.completed) {
            // Remove the completed task from its current position and adjust the taskIds of the remaining tasks
            const remainingTasks = taskListToUpdate.tasks
                .filter((task) => task.taskId !== taskId)
                .map((task, index) => {
                    return { ...task,taskId: index + 1 };
                });
    
            // Append the completed task at the end while assigning the appropriate taskId
            const updatedTasks = [
                ...remainingTasks,
                { ...updatedTask, taskId: remainingTasks.length + 1 },
            ];
    
            const updatedTaskList = {
                ...taskListToUpdate,
                tasks: updatedTasks,
            };
    
            const updatedTaskLists = taskLists.map((taskList) =>
                taskList.listId === listId ? updatedTaskList : taskList,
            );
    
            setTaskLists(updatedTaskLists);
    
            if (selectedTaskList && selectedTaskList.listId === listId) {
                setSelectedTaskList(updatedTaskList);
            }

            setSelectedTask({ ...updatedTask, taskId: remainingTasks.length + 1 });

            localStorage.setItem("taskLists", JSON.stringify(updatedTaskLists));
        } else {
            // If the task is not completed, just update the task
            handleTaskUpdate(listId, updatedTask);
        }
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