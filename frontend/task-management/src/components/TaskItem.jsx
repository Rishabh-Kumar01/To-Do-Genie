import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateTask as updateTaskAPI, deleteTask as deleteTaskAPI } from '../api';
import { updateTask, deleteTask } from '../redux/slices/taskSlice';
import { Edit2, Eye, Trash2, CheckCircle, Circle } from 'lucide-react';

function TaskItem({ task, onDelete, onUpdate }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentTask, setCurrentTask] = useState(task);

  const handleStatusChange = async () => {
    try {
      const newStatus = currentTask.status === "pending" ? "completed" : "pending";
      const updatedTask = { ...currentTask, status: newStatus };
      
      setCurrentTask(updatedTask);
      
      const response = await updateTaskAPI(currentTask._id, updatedTask);
      dispatch(updateTask(response.data));
      
      if (response.data.status !== newStatus) {
        setCurrentTask(response.data);
      }

      if (onUpdate) {
        onUpdate(response.data);
      }
    } catch (err) {
      console.error('Error updating task:', err);
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

  const handleEdit = () => {
    navigate(`/edit-task/${currentTask._id}`);
  };

  const handleView = () => {
    navigate(`/task/${currentTask._id}`);
  };

  return (
    <div className={`border p-4 rounded ${currentTask.status === "completed" ? 'bg-green-100' : 'bg-white'}`}>
      <h2 className="text-xl font-bold mb-2">{currentTask.title}</h2>
      <p className="mb-2">{currentTask.description}</p>
      <p className="mb-2">Due: {new Date(currentTask.dueDate).toLocaleDateString()}</p>
      <p className="mb-2">Status: {currentTask.status}</p>
      <div className="flex justify-between items-center">
        <button
          onClick={handleStatusChange}
          className="text-gray-600 hover:text-gray-900"
          title={currentTask.status === "completed" ? "Mark as Pending" : "Mark as Completed"}
        >
          {currentTask.status === "completed" ? 
            <CheckCircle className="w-6 h-6" /> : 
            <Circle className="w-6 h-6" />
          }
        </button>
        <div className="flex space-x-2">
          <button
            onClick={handleEdit}
            className="text-blue-500 hover:text-blue-700"
            title="Edit Task"
          >
            <Edit2 className="w-5 h-5" />
          </button>
          <button
            onClick={handleView}
            className="text-green-500 hover:text-green-700"
            title="View Task"
          >
            <Eye className="w-5 h-5" />
          </button>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700"
            title="Delete Task"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;