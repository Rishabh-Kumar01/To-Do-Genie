import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getTask, updateTask, deleteTask } from '../api';
import { updateTask as updateTaskAction, deleteTask as deleteTaskAction } from '../redux/slices/taskSlice';
import { Edit2, Trash2, CheckCircle, Circle } from 'lucide-react';

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

  const handleStatusChange = async () => {
    try {
      const newStatus = task.status === "pending" ? "completed" : "pending";
      const response = await updateTask(id, { status: newStatus });
      dispatch(updateTaskAction(response.data));
      setTask(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(id);
      dispatch(deleteTaskAction(id));
      navigate('/', { replace: true });
    } catch (err) {
      setError(`Error deleting task: ${err.message}`);
    }
  };

  const handleEdit = () => {
    navigate(`/edit-task/${id}`);
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;
  if (!task) return <div className="text-center">Task not found</div>;

  return (
    <div className="container mx-auto max-w-2xl mt-8">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col h-full min-h-[300px]">
        <div className="flex-grow">
          <h1 className="text-2xl font-bold mb-4">{task.title}</h1>
          <p className="mb-4">{task.description}</p>
          <p className="mb-4">Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
          <p className="mb-4">Status: {task.status}</p>
        </div>
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
          <button 
            onClick={handleStatusChange}
            className={`flex items-center ${task.status === "completed" ? 'text-yellow-500 hover:text-yellow-700' : 'text-green-500 hover:text-green-700'}`}
            title={task.status === "completed" ? "Mark as Pending" : "Mark as Completed"}
          >
            {task.status === "completed" ? 
              <CheckCircle className="w-6 h-6 mr-2" /> : 
              <Circle className="w-6 h-6 mr-2" />
            }
            <span className="hidden sm:inline">
              {task.status === "completed" ? 'Mark as Pending' : 'Mark as Completed'}
            </span>
          </button>
          <div className="space-x-4">
            <button 
              onClick={handleEdit}
              className="text-blue-500 hover:text-blue-700"
              title="Edit Task"
            >
              <Edit2 className="w-6 h-6" />
            </button>
            <button 
              onClick={handleDelete}
              className="text-red-500 hover:text-red-700"
              title="Delete Task"
            >
              <Trash2 className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskDetails;