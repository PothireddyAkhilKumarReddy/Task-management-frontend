import React from 'react';

const Projects = () => {
    return (
        <div className="projects-container">
            <div className="header-actions" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Projects</h1>
                <button className="btn btn-primary">+ New Project</button>
            </div>

            <div className="empty-state" style={{ textAlign: 'center', padding: '4rem', background: 'white', borderRadius: '1rem', border: '1px solid #e5e7eb' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem', color: '#d1d5db' }}>📁</div>
                <h3>No projects found</h3>
                <p style={{ color: '#6b7280' }}>Create your first project to organize your tasks!</p>
            </div>
        </div>
    );
};

export default Projects;
