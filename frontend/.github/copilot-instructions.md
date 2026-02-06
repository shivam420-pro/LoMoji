import React from 'react';

export default function UserWorkBook() {
  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h3">Dashboard</h1>
        <div>
          <button className="btn btn-primary me-2">New Item</button>
          <button className="btn btn-outline-secondary">Settings</button>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Overview</h5
              <p className="card-text">Quick summary cards go here.</p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Activity</h5>
              <p className="card-text">Recent actions and status.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}