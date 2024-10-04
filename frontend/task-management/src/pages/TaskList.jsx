import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getTasks } from '../api';
import TaskItem from '../components/TaskItem';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const user = useSelector(state => state.auth.user);
  const limit = 9; 

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await getTasks(currentPage, limit);
        setTasks(response.data.tasks);
        setCurrentPage(response.data.currentPage);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch tasks. Please try again.');
        setLoading(false);
      }
    };

    if (user) {
      fetchTasks();
    }
  }, [user, currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleTaskDelete = (deletedTaskId) => {
    setTasks(tasks.filter(task => task._id !== deletedTaskId));
  };

  const handleTaskUpdate = (updatedTask) => {
    setTasks(tasks.map(task => task._id === updatedTask._id ? updatedTask : task));
  };

  if (loading) return <div className="text-center">Loading tasks...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow container mx-auto px-4 pb-16">
        <h1 className="text-2xl font-bold mb-4 mt-8">Your Tasks</h1>
        {tasks.length === 0 ? (
          <p>You have no tasks. Start by creating a new task!</p>
        ) : (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr mb-4">
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
      
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-center items-center space-x-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-500 hover:text-blue-700'}`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <span className="text-lg font-semibold">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-blue-500 hover:text-blue-700'}`}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskList;