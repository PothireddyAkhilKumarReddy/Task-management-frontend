import React from 'react';
import { Link } from 'react-router-dom';
import './TaskBoard.css';

function TaskBoard({ tasks, setTasks }) {
  const handleDragStart = (e, task, sourceStatus) => {
    e.dataTransfer.setData('task', JSON.stringify({ task, sourceStatus }));
    e.target.classList.add('dragging');
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove('dragging');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetStatus) => {
    e.preventDefault();
    const { task, sourceStatus } = JSON.parse(e.dataTransfer.getData('task'));

    if (sourceStatus === targetStatus) return;

    // Optimistic UI Update
    setTasks(prev => ({
      ...prev,
      [sourceStatus]: prev[sourceStatus].filter(t => t.id !== task.id),
      [targetStatus]: [...prev[targetStatus], { ...task, status: targetStatus }]
    }));

    // API Call to persist change
    const token = localStorage.getItem('token');
    fetch(`http://localhost:9292/tasks/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ ...task, status: targetStatus })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to update task status');
        }
      })
      .catch(err => {
        console.error("Error updating task:", err);
        // Revert UI on error (optional, but good practice)
        setTasks(prev => ({
          ...prev,
          [sourceStatus]: [...prev[sourceStatus], task],
          [targetStatus]: prev[targetStatus].filter(t => t.id !== task.id)
        }));
        alert("Failed to save task status. Please try again.");
      });
  };

  const TaskColumn = ({ title, status, tasks }) => (
    <div
      className={`task-column ${status}`}
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, status)}
    >
      <div className="column-header">
        <div className="header-title">
          <span className={`status-dot ${status}`}></span>
          <h2>{title}</h2>
        </div>
        <span className="task-count">{tasks.length}</span>
      </div>
      <div className="task-list">
        {tasks.map(task => (
          <div
            key={task.id}
            className="task-card"
            draggable
            onDragStart={(e) => handleDragStart(e, task, status)}
            onDragEnd={handleDragEnd}
          >
            <div className="task-card-header">
              <h3>{task.title}</h3>
              {task.priority && (
                <span className={`priority-badge ${task.priority.toLowerCase()}`}>
                  {task.priority}
                </span>
              )}
            </div>
            <p className="task-description">{task.description}</p>
            <div className="task-footer">
              {task.dueDate && (
                <div className="task-due-date">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  {new Date(task.dueDate).toLocaleDateString()}
                </div>
              )}
              <div className="task-avatar">
                {/* Placeholder avatar */}
                <div className="avatar-circle">
                  {task.title.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        ))}
        {tasks.length === 0 && (
          <div className="empty-column">
            <p>Drop tasks here</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="taskboard-container">
      <div className="taskboard-header">
        <div>
          <h1>Task Board</h1>
          <p>Manage and organize your workflow</p>
        </div>
        <Link to="/create-task" className="btn btn-primary" style={{ textDecoration: 'none' }}>
          + New Task
        </Link>
      </div>
      <div className="task-board">
        <TaskColumn
          title="To Do"
          status="todo"
          tasks={tasks.todo}
        />
        <TaskColumn
          title="In Progress"
          status="inProgress"
          tasks={tasks.inProgress}
        />
        <TaskColumn
          title="Completed"
          status="completed"
          tasks={tasks.completed}
        />
      </div>
    </div>
  );
}

export default TaskBoard;