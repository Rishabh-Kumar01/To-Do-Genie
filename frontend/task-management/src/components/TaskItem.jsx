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
      
      const response = await updateTaskAPI(currentTask._id, { status: newStatus });
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
    <div className={`border rounded-lg shadow-sm overflow-hidden flex flex-col h-full ${currentTask.status === "completed" ? 'bg-green-50' : 'bg-white'}`}>
      <div className="p-4 flex-grow">
        <h2 className="text-lg font-semibold mb-2 truncate">{currentTask.title}</h2>
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{currentTask.description}</p>
        <p className="text-sm text-gray-500 mb-1">Due: {new Date(currentTask.dueDate).toLocaleDateString()}</p>
        <p className="text-sm text-gray-500">Status: {currentTask.status}</p>
      </div>
      <div className="border-t border-gray-200 bg-gray-50 px-4 py-3 sm:px-6 flex justify-between items-center">
        <button
          onClick={handleStatusChange}
          className={`${currentTask.status === "completed" ? 'text-yellow-500 hover:text-yellow-700' : 'text-green-500 hover:text-green-700'}`}
          title={currentTask.status === "completed" ? "Mark as Pending" : "Mark as Completed"}
        >
          {currentTask.status === "completed" ? 
            <CheckCircle className="w-5 h-5" /> : 
            <Circle className="w-5 h-5" />
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