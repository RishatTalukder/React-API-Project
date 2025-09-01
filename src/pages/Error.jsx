import React, { memo } from "react";

const Error = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4 text-center" style={{ maxWidth: 400 }}>
        <h1 className="display-4 text-danger mb-3">404</h1>
        <h2 className="mb-3">Page Not Found</h2>
        <p className="mb-4">Sorry, the page you are looking for does not exist.</p>
        <a href="/" className="btn btn-primary">Go Home</a>
      </div>
    </div>
  );
};

export default memo(Error);
