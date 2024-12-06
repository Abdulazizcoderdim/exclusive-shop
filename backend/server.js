require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middleware/error.middleware');
const cors = require('cors');
const app = express();

// middleware
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.static('static'));
app.use(fileUpload({}));

// routes
app.use('/api/product', require('./routes/product.route'));
app.use('/api/auth', require('./routes/auth.route'));
app.use('/api/user', require('./routes/user.route'));

// error middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

const bootstrap = async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URL)
      .then(() => console.log('Connected with DB'));
    app.listen(PORT, () => {
      console.log(`App is running on port - http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(`Error connecting with DB - ${error}`);
  }
};
bootstrap();
