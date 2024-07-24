import React from 'react';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Login from './components/Login';
import ChatRoom from './components/ChatRoom';

function App() {
  const [user] = useAuthState(auth);

  return (
    <HashRouter>
      <div className="App">
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
          <h1>Chat App</h1>
          {user && <button onClick={() => auth.signOut()}>Sign Out</button>}
        </header>
        <Routes>
        
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/chat" />} />
          <Route path="/chat" element={user ? <ChatRoom /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to={user ? "/chat" : "/login"} />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;