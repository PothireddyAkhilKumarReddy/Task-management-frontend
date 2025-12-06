import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/login';
import Signup from './components/signup';
import Home from './components/Home';
import TaskBoard from './components/TaskBoard';
import Projects from './components/Projects';
import Analytics from './components/Analytics';
import Help from './components/Help';
import About from './components/About';
import AddTaskForm from './components/AddTaskForm';
import './App.css';

function App() {
  const [tasks, setTasks] = useState({ todo: [], inProgress: [], completed: [] });
  const [username, setUsername] = useState(localStorage.getItem('username'));

  // Listen for login/logout events
  React.useEffect(() => {
    const handleStorageChange = () => {
      setUsername(localStorage.getItem('username'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Fetch tasks from backend when username changes
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (username && token) {
      fetch('http://localhost:9292/tasks', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => {
          if (res.status === 401 || res.status === 403) {
            console.error("Unauthorized");
            return [];
          }
          return res.json();
        })
        .then(data => {
          if (Array.isArray(data)) {
            // Group tasks by status
            const grouped = {
              todo: data.filter(t => t.status === 'todo'),
              inProgress: data.filter(t => t.status === 'inProgress'),
              completed: data.filter(t => t.status === 'completed')
            };
            setTasks(grouped);
          }
        })
        .catch(err => console.error("Error fetching tasks:", err));
    } else {
      setTasks({ todo: [], inProgress: [], completed: [] });
    }
  }, [username]);

  const handleAddTask = (newTask) => {
    const token = localStorage.getItem('token');
    if (!username || !token) return;

    const taskPayload = { ...newTask, status: 'todo' }; // Username handled by backend

    fetch('http://localhost:9292/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(taskPayload)
    })
      .then(res => res.json())
      .then(savedTask => {
        setTasks(prev => ({
          ...prev,
          todo: [...prev.todo, savedTask]
        }));
      });
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/home" element={<Home tasks={tasks} />} />
            <Route path="/tasks" element={<TaskBoard tasks={tasks} setTasks={setTasks} />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/help" element={<Help />} />
            <Route path="/about" element={<About />} />
            <Route path="/create-task" element={<AddTaskForm onAddTask={handleAddTask} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Navigate to="/home" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App; 