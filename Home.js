import React from 'react';
import { useNavigate } from 'react-router-dom';
import MessageIcon from './MessageIcon';

const Home = () => {
  const navigate = useNavigate();

  const handleMessageIconClick = () => {
    navigate('/chat');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <MessageIcon unreadCount={0} onClick={handleMessageIconClick} />
    </div>
  );
};

export default Home;