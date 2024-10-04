import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateTask as updateTaskAPI, deleteTask as deleteTaskAPI } from '../api';
import { updateTask, deleteTask } from '../redux/slices/taskSlice';

function TaskItem({ task }) {
  const dispatch = useDispatch();

  const handleComplete = async () => {
    try {
      const updatedTask = { ...task, completed: !task.completed };
      await updateTaskAPI(task.id, updatedTask);
      dispatch(updateTask(updatedTask));
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTaskAPI(task.id);
      dispatch(deleteTask(task.id));
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  return (
    <div className={`border p-4 rounded ${task.completed ? 'bg-green-100' : 'bg-white'}`}>
      <h2 className="text-xl font-bold mb-2">{task.title}</h2>
      <p className="mb-2">{task.description}</p>
      <p className="mb-2">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
      <div className="flex justify-between">
        <button
          onClick={handleComplete}
          className={`${task.completed ? 'bg-yellow-500 hover:bg-yellow-700' : 'bg-green-500 hover:bg-green-700'} text-white font-bold py-1 px-2 rounded`}
        >
          {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
        </button>
        <div>
          <Link to={`/task/${task.id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2">
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