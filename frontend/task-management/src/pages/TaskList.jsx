import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getTasks } from '../api';
import TaskItem from '../components/TaskItem';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks();
        setTasks(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch tasks. Please try again.');
        setLoading(false);
      }
    };

    if (user) {
      fetchTasks();
    }
  }, [user]);

  const handleTaskDelete = (deletedTaskId) => {
    setTasks(tasks.filter(task => task._id !== deletedTaskId));
  };

  const handleTaskUpdate = (updatedTask) => {
    setTasks(tasks.map(task => task._id === updatedTask._id ? updatedTask : task));
  };

  if (loading) return <div className="text-center">Loading tasks...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Your Tasks</h1>
      {tasks.length === 0 ? (
        <p>You have no tasks. Start by creating a new task!</p>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {tasks.map(task => (
            <TaskItem 
              key={task._id} 
              task={task} 
              onDelete={handleTaskDelete} 
              onUpdate={handleTaskUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskList;