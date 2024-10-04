import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateTask as updateTaskAPI, deleteTask as deleteTaskAPI } from '../api';
import { updateTask, deleteTask } from '../redux/slices/taskSlice';

function TaskItem({ task, onDelete, onUpdate }) {
  const dispatch = useDispatch();
  const [currentTask, setCurrentTask] = useState(task);

  const handleStatusChange = async () => {
    try {
      const newStatus = currentTask.status === "pending" ? "completed" : "pending";
      const updatedTask = { ...currentTask, status: newStatus };
      
      // Optimistically update the UI
      setCurrentTask(updatedTask);
      
      const response = await updateTaskAPI(currentTask._id, updatedTask);
      dispatch(updateTask(response.data));
      
      // If the server response is different from what we expected, update again
      if (response.data.status !== newStatus) {
        setCurrentTask(response.data);
      }

      // Notify parent component about the update
      if (onUpdate) {
        onUpdate(response.data);
      }
    } catch (err) {
      console.error('Error updating task:', err);
      // Revert the optimistic update if there's an error
      setCurrentTask(task);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTaskAPI(currentTask._id);
      dispatch(deleteTask(currentTask._id));
      if (onDelete) {
        onDelete(currentTask._id);
      }
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  return (
    <div className={`border p-4 rounded ${currentTask.status === "completed" ? 'bg-green-100' : 'bg-white'}`}>
      <h2 className="text-xl font-bold mb-2">{currentTask.title}</h2>
      <p className="mb-2">{currentTask.description}</p>
      <p className="mb-2">Due: {new Date(currentTask.dueDate).toLocaleDateString()}</p>
      <p className="mb-2">Status: {currentTask.status}</p>
      <div className="flex justify-between">
        <button
          onClick={handleStatusChange}
          className={`${currentTask.status === "completed" ? 'bg-yellow-500 hover:bg-yellow-700' : 'bg-green-500 hover:bg-green-700'} text-white font-bold py-1 px-2 rounded`}
        >
          {currentTask.status === "completed" ? 'Mark as Pending' : 'Mark as Completed'}
        </button>
        <div>
          <Link to={`/task/${currentTask._id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2">
            View
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;