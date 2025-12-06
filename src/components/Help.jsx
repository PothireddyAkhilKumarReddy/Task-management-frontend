import React from 'react';

const Help = () => {
    return (
        <div className="help-container" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Help Center</h1>
            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Frequently asked questions and support.</p>

            <div className="faq-section">
                <details style={{ background: 'white', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb', marginBottom: '1rem' }}>
                    <summary style={{ fontWeight: '600', cursor: 'pointer' }}>How do I create a new task?</summary>
                    <p style={{ marginTop: '0.5rem', color: '#4b5563' }}>Click on the "+ Create Task" button on the Dashboard or the "+ New Task" button on the Task Board.</p>
                </details>

                <details style={{ background: 'white', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb', marginBottom: '1rem' }}>
                    <summary style={{ fontWeight: '600', cursor: 'pointer' }}>How do I move tasks?</summary>
                    <p style={{ marginTop: '0.5rem', color: '#4b5563' }}>You can drag and drop tasks between the "To Do", "In Progress", and "Completed" columns on the Task Board.</p>
                </details>

                <details style={{ background: 'white', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb', marginBottom: '1rem' }}>
                    <summary style={{ fontWeight: '600', cursor: 'pointer' }}>Is my data saved?</summary>
                    <p style={{ marginTop: '0.5rem', color: '#4b5563' }}>Yes, your tasks are saved to the database and linked to your account.</p>
                </details>
            </div>
        </div>
    );
};

export default Help;
