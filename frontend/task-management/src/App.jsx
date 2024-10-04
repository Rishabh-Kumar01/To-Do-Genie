import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Sidebar from './components/Sidebar';
import ProtectedRoute from './components/ProtectedRoute';
import TaskList from './pages/TaskList';
import TaskForm from './pages/TaskForm';
import TaskDetails from './pages/TaskDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <Provider store={store}>
      <Router>
        <div className="flex h-screen bg-gray-900 text-white">
          <div 
            className={`fixed inset-0 bg-gray-800 bg-opacity-75 z-20 transition-opacity duration-300 ease-in-out ${
              sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            } md:hidden`}
            onClick={closeSidebar}
          ></div>
          <div 
            className={`fixed inset-y-0 left-0 w-64 bg-gray-800 z-30 transition-transform duration-300 ease-in-out transform ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } md:relative md:translate-x-0`}
          >
            <Sidebar closeSidebar={closeSidebar} />
          </div>
          <div className="flex-1 flex flex-col">
            <Header toggleSidebar={toggleSidebar} />
            <main className="flex-1 p-6 overflow-y-auto">
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
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </Provider>
  );
}
export default App;