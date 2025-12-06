import React from 'react';

const Analytics = () => {
    return (
        <div className="analytics-container" style={{ padding: '2rem' }}>
            <h1>Analytics Dashboard</h1>
            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Track your productivity metrics.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', border: '1px solid #e5e7eb' }}>
                    <h3>Task Completion Rate</h3>
                    <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9fafb', borderRadius: '0.5rem', marginTop: '1rem' }}>
                        <span style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>85%</span>
                    </div>
                </div>

                <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', border: '1px solid #e5e7eb' }}>
                    <h3>Weekly Activity</h3>
                    <div style={{ height: '200px', display: 'flex', alignItems: 'end', justifyContent: 'space-around', background: '#f9fafb', borderRadius: '0.5rem', marginTop: '1rem', paddingBottom: '1rem' }}>
                        {[40, 70, 30, 85, 50, 60, 20].map((h, i) => (
                            <div key={i} style={{ width: '30px', height: `${h}%`, background: '#3b82f6', borderRadius: '4px' }}></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
