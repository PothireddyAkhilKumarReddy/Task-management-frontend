import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home({ tasks }) {
  const totalTasks = tasks.todo.length + tasks.inProgress.length + tasks.completed.length;
  const completedTasks = tasks.completed.length;
  const inProgressTasks = tasks.inProgress.length;
  const pendingTasks = tasks.todo.length;
  const username = localStorage.getItem("username") || "User";

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Welcome back, {username}! 👋</h1>
        <p className="subtitle">Here's your productivity overview for today.</p>
      </header>

      <section className="section-quick-actions">
        <h3>Quick Actions</h3>
        <div className="actions-row">
          <Link to="/create-task" className="btn-action btn-blue">
            <span className="icon">+</span> Create Task
          </Link>
          <Link to="/projects" className="btn-action btn-green">
            <span className="icon">+</span> New Project
          </Link>
          <Link to="/analytics" className="btn-action btn-purple">
            <span className="icon">📈</span> View Analytics
          </Link>
          <Link to="/help" className="btn-action btn-orange">
            <span className="icon">❓</span> Get Help
          </Link>
        </div>
      </section>

      <section className="section-stats">
        <h3>Your Stats</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-label">TOTAL TASKS</span>
            <span className="stat-value text-blue">{totalTasks}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">TO DO</span>
            <span className="stat-value text-gray">{pendingTasks}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">IN PROGRESS</span>
            <span className="stat-value text-orange">{inProgressTasks}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">COMPLETED</span>
            <span className="stat-value text-green">{completedTasks}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">OVERDUE</span>
            <span className="stat-value text-red">0</span>
          </div>
        </div>
      </section>

      <div className="dashboard-bottom-grid">
        <section className="section-recent-tasks card">
          <h3>Recent Tasks</h3>
          {totalTasks === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <p>No tasks yet. Create your first task!</p>
            </div>
          ) : (
            <ul className="recent-list">
              {tasks.todo.slice(0, 3).map(task => (
                <li key={task.id} className="recent-item">
                  <span className="dot todo"></span> {task.title}
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="section-recent-projects card">
          <h3>Recent Projects</h3>
          <div className="empty-state">
            <div className="empty-icon">📁</div>
            <p>No projects yet. Create your first project!</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;