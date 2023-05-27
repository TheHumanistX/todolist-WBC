import React from 'react';
import TaskDetails from './';

function EditTask({ selectedTask, onEdit, onDelete }) {
  const handleSave = (updatedTask) => {
    onEdit(updatedTask);
  };

  return (
    <div>
      <h2>Edit Task</h2>
      <TaskDetails
        selectedTask={selectedTask}
        onConfirm={handleSave}
        onDelete={onDelete}
        editMode={true}
      />
    </div>
  );
}

export default EditTask;