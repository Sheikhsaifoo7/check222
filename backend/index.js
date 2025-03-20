const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();
const router=require('./routes/router');
const cors=require("cors");
const app = express();
const cookieParser = require('cookie-parser')


// Connect to database
connectDB();

//
app.use(cors());  
app.use(cookieParser())
app.use(express.json());
app.use(router);

// Routes
// app.use('/api/items');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
