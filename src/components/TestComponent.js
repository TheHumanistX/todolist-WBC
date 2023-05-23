import React from 'react'
import { Box } from '@mui/material'
import { format } from 'date-fns';
import { AddButton, ProgressBar, HeaderBar, TaskList, Task, Lists, Tasks, TaskDetails } from './'
const TestComponent = () => {
    const taskList1 = { id: 1, name: 'Errands', tasksCompleted: 3, totalTasks: 12 }
    const taskList2 = { id: 2, name: 'Yardwork', tasksCompleted: 7, totalTasks: 10 }
    const task1 = { id: 1, name: 'Go by bank', completed: false, dueDate: format(new Date('2023-06-26'), 'MM/dd/yyyy').toString(), details: '', created: format(new Date('2023-05-23'), 'MM/dd/yyyy').toString()}
    const task2 = { id: 2, name: 'Pay electric bill', completed: true }
    
    const progress = (taskList1.tasksCompleted / taskList1.totalTasks) * 100
    return (
        <Box bgcolor='backgroundColor.default'>
            <AddButton />
            <ProgressBar progress={progress} />
            <HeaderBar currentTaskListName='Errands' tasksCompleted='7' totalTasks='9'/>
            <TaskList key={taskList1.id} taskList={taskList1} />
            <TaskList key={taskList2.id} taskList={taskList2} />
            <Task task={task1} />
            <Task task={task2} />
            <Lists />
            <Tasks taskList = {taskList1}/>
            <TaskDetails task={task1}/>
        </Box>
    )
}

export default TestComponent
