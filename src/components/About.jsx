import React from 'react';

const About = () => {
    return (
        <div className="about-container" style={{ padding: '4rem 2rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🚀</div>
            <h1>About TaskFlow</h1>
            <p style={{ fontSize: '1.2rem', color: '#6b7280', marginBottom: '2rem' }}>
                TaskFlow is a modern productivity tool designed to help you organize your life and work efficiently.
            </p>

            <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', border: '1px solid #e5e7eb', textAlign: 'left' }}>
                <p><strong>Version:</strong> 1.0.0</p>
                <p><strong>Created by:</strong> Google Deepmind Agent</p>
                <p><strong>Tech Stack:</strong> React, Spring Boot, MySQL, Kubernetes</p>
            </div>
        </div>
    );
};

export default About;
