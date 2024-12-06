const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
require('dotenv').config();

// Initialize the app
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: '*', // Adjust based on your frontend's origin
    methods: ['GET', 'POST'],
  },
});

const PORT = 5001;

// Use JSON parsing and enable CORS for API requests
app.use(express.json());
app.use(cors());

// MongoDB connection setup
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Mongoose Schema and Model for messages
const messageSchema = new mongoose.Schema({
  user: String,
  content: String,
  type: { type: String, enum: ['user', 'system'], default: 'user' },
  timestamp: { type: Date, default: Date.now },
  expireAt: {
    type: Date,
    default: () => Date.now(),
    index: { expires: '24h' },
  }, // TTL field
});

const Message = mongoose.model('Message', messageSchema);

// Keep track of connected users
let users = [];

// Socket.IO events
io.on('connection', socket => {
  console.log('User connected:', socket.id);

  // Load chat history from MongoDB
  const loadMessages = async () => {
    try {
      const messages = await Message.find().sort({ timestamp: 1 });
      socket.emit('loadMessages', messages); // Emit previous messages to newly connected user
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  // Call to load messages when a new user connects
  loadMessages();

  // Handle user joining the chat
  socket.on('join', username => {
    users.push({ id: socket.id, username });
    io.emit('userList', users);
    io.emit('message', {
      type: 'system',
      content: `${username} has joined the chat.`,
    });
  });

  // Handle sending messages
  socket.on('sendMessage', async messageContent => {
    const user = users.find(u => u.id === socket.id);
    if (user) {
      const message = await Message.create({
        user: user.username,
        content: messageContent,
      });
      try {
        await message.save(); // Save the message to MongoDB
        io.emit('message', {
          type: 'user',
          user: user.username,
          content: messageContent,
        });
      } catch (error) {
        console.error('Error saving message:', error);
      }
    }
  });

  // Handle user disconnect
  socket.on('disconnect', () => {
    const user = users.find(u => u.id === socket.id);
    if (user) {
      users = users.filter(u => u.id !== socket.id);
      io.emit('userList', users);
      io.emit('message', {
        type: 'system',
        content: `${user.username} has left the chat.`,
      });
    }
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
