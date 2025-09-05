import React from 'react';

const Alert = ({ message, type = 'error' }) => {
  const alertClasses = `alert alert-${type}`;

  return (
    <div className={alertClasses} role="alert">
      {message}
    </div>
  );
};

export default Alert;
