const express = require('express');
const mongoose = require('mongoose');

const userRouter = require('./routers/user');

const PORT = process.env.PORT || 3001;
const MONGO_URL = process.env.MONGO_URL; 

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Дозволити всім
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());

app.use('/users', userRouter);

app.get('/hello', (req, res) => {
    res.send('Wow! It works!!!!');
});


if (!MONGO_URL) {
  console.error('Fatal Error: MONGO_URL environment variable is not set.');
  process.exit(1); 
}

mongoose.connect(MONGO_URL) 
  .then(() => {
    console.log('Successfully connected to MongoDB!');
    
    app.listen(PORT, () => {
        console.log(`Running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  });