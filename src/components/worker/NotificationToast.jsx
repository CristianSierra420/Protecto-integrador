import React from 'react';
import '../../pages/Dashboard/dashboard-components.css';

const NotificationToast = ({ message, type = 'warning' }) => {
  if (!message) {
    return null;
  }

  return (
    <div className={`notification-toast card-soft`} role="status">
      <p className={type === 'warning' ? 'muted' : ''}>{message}</p>
    </div>
  );
};

export default NotificationToast;
