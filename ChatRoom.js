import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, query, orderBy, limit, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import MessageIcon from './MessageIcon';

const ChatRoom = () => {
  const [user] = useAuthState(auth);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt'), limit(50));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedMessages = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(fetchedMessages);
      
      const newUnreadCount = fetchedMessages.filter(msg => !msg.read && msg.uid !== user.uid).length;
      setUnreadCount(newUnreadCount);
    });
   
    return unsubscribe;
  }, [user.uid]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    await addDoc(collection(db, 'messages'), {
      text: newMessage,
      createdAt: new Date(),
      uid: user.uid,
      displayName: user.email,
      isAdmin: false,
      read: false
    });
    setNewMessage('');
  };

  const markAsRead = async (messageId) => {
    await updateDoc(doc(db, 'messages', messageId), {
      read: true
    });
  };

  return (
    <div>
      <MessageIcon unreadCount={unreadCount} />
      <div style={{ height: '400px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
        {messages.map(msg => (
          <div key={msg.id} onClick={() => markAsRead(msg.id)} style={{ cursor: 'pointer', marginBottom: '5px' }}>
            <strong>{msg.isAdmin ? 'Admin' : 'User'} {msg.displayName}: </strong>
            {msg.text}
            {!msg.read && msg.uid !== user.uid && <span style={{ color: 'red', marginLeft: '5px' }}>•</span>}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
          style={{ width: '80%', marginRight: '10px' }}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatRoom;