import React, { useState } from 'react';
import TaskDetails from './';

function TaskADd({ onAdd }) {
  const [task, setTask] = useState({ description: '', dueDate: null });

  const handleSave = () => {
    onAdd(task);
    setTask({ description: '', dueDate: null });
  };

  return (
    <div>
      <h2>Add Task</h2>
      <TaskDetails
        selectedTask={task}
        onConfirm={handleSave}
        onDelete={() => {}}
        editMode={true}
      />
    </div>
  );
}

export default TaskADd;