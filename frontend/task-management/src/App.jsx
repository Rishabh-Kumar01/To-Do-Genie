import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import EditTask from './components/EditTask';
import TaskList from './pages/TaskList';
import TaskForm from './pages/TaskForm';
import TaskDetails from './pages/TaskDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import ChangePassword from './components/ChangePassword';
import { useDispatch } from 'react-redux';
import { clearError } from './redux/slices/authSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <Router>
      <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
        {/* Full-width header */}
        <Header toggleSidebar={toggleSidebar} />
        
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div 
            className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-200 dark:bg-gray-800 pt-16 transition-transform duration-300 ease-in-out transform ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } md:relative md:translate-x-0`}
          >
            <Sidebar closeSidebar={closeSidebar} />
          </div>
          
          {/* Overlay for mobile */}
          {sidebarOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
              onClick={closeSidebar}
            ></div>
          )}
          
          {/* Main content */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white dark:bg-gray-900 p-6 pt-16">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route 
                path="/" 
                element={
                  <ProtectedRoute>
                    <TaskList />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/task/:id" 
                element={
                  <ProtectedRoute>
                    <TaskDetails />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/new-task" 
                element={
                  <ProtectedRoute>
                    <TaskForm />
                  </ProtectedRoute>
                } 
              />
              <Route 
              path="/edit-task/:id" 
              element={
                <ProtectedRoute>
                  <EditTask />
                </ProtectedRoute>
              } 
              />
              <Route 
                path="/change-password" 
                element={
                  <ProtectedRoute>
                    <ChangePassword />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;