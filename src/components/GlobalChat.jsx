import React, { useState, useRef, useEffect} from 'react';
import { Box, TextField, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import GlobalChatService from '../services/GlobalChatService';
import UserService from '../services/UserService';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [userId, setUserId] = useState(UserService.getUserData().id);
  const [username, setUsername] = useState(UserService.getUserData().email);
  const [open, setOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const clientRef = useRef(null);

  useEffect(() => {
    let unsubscribed = false
    if(!unsubscribed){
        GlobalChatService.getAllGlobalChatMessages().then((response) => {
            setMessages(response)
        })
    }

    return () => {
        unsubscribed = true;
    }
  }, [])

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws');
    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        client.subscribe('/topic/global', (message) => {
          const receivedMessage = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        });
      },
    });
    client.activate();
    clientRef.current = client;

    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
      }
    };
  }, []);

  const handleSend = () => {
    if (input.trim()) {
      const message = { userId: userId, username: username, message: input };
      clientRef.current.publish({ destination: '/app/globalChat', body: JSON.stringify(message) });
      setInput('');
    }
  };

  const toggleChat = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <Box sx={{ position: 'fixed', bottom: 0, right: 0, margin: 2 }}>
      <IconButton onClick={toggleChat} color="primary">
        <p>Chat</p>
        <ChatIcon />
      </IconButton>
      {open && (
        <Box sx={{ width: 500, bgcolor: 'background.paper', boxShadow: 3, borderRadius: 1, padding: 2 }}>
          <Box sx={{ maxHeight: 400, overflowY: 'auto', marginBottom: 2 }}>
            <List>
              {messages?.map((message, index) => (
                <ListItem key={index}>
                  <ListItemText primary={`${message.username}: ${message.message}`} />
                </ListItem>
              ))}
              <div ref={messagesEndRef} />
            </List>
          </Box>
          <TextField
            label="Type a message"
            variant="outlined"
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSend();
              }
            }}
          />
          <Button variant="contained" color="primary" onClick={handleSend} sx={{ marginTop: 2 }}>
            Send
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Chat;
