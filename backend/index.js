//backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Connect to MongoDB
//jasonmziegler
//4ADzU2XGlGLp2yiL
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, ()=> {
  console.log(`Server is running on port ${PORT}`);
})