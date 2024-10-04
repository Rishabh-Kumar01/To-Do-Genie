import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTask, updateTask, deleteTask } from '../api';
import { updateTask as updateTaskAction, deleteTask as deleteTaskAction } from '../redux/slices/taskSlice';

function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await getTask(id);
        setTask(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleComplete = async () => {
    try {
      const updatedTask = { ...task, completed: !task.completed };
      await updateTask(id, updatedTask);
      dispatch(updateTaskAction(updatedTask));
      setTask(updatedTask);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(id);
      dispatch(deleteTaskAction(id));
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;
  if (!task) return <div className="text-center">Task not found</div>;

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">{task.title}</h1>
      <p className="mb-4">{task.description}</p>
      <p className="mb-4">Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
      <p className="mb-4">Status: {task.completed ? 'Completed' : 'Incomplete'}</p>
      <button 
        onClick={handleComplete}
        className={`mr-2 ${task.completed ? 'bg-yellow-500 hover:bg-yellow-700' : 'bg-green-500 hover:bg-green-700'} text-white font-bold py-2 px-4 rounded`}
      >
        {task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
      </button>
      <button 
        onClick={handleDelete}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Delete Task
      </button>
    </div>
  );
}

export default TaskDetails;