const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;


app.use(express.json());

const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const corsOptions = {
  origin: 'https://rlmacapagal-automatic-computing-machine-vjgxwgxrv9g3w5j6-3000.preview.app.github.dev'
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

const todoRouter = require('./routes/todos');

app.use('/todos', todoRouter);
