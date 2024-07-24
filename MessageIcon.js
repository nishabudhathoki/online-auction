import React from 'react';

const MessageIcon = ({ unreadCount, onClick }) => {
  return (
    <div 
      style={{ position: 'relative', display: 'inline-block', cursor: 'pointer' }}
      onClick={onClick}
    >
      <span role="img" aria-label="message" style={{ fontSize: '48px' }}>
        ✉️
      </span>
      {unreadCount > 0 && (
        <span
          style={{
            position: 'absolute',
            top: '-10px',
            right: '-10px',
            background: 'red',
            color: 'white',
            borderRadius: '50%',
            padding: '2px 6px',
            fontSize: '12px',
          }}
        >
          {unreadCount}
        </span>
      )}
    </div>
  );
};

export default MessageIcon;