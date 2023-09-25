const express = require('express');
const cors = require('cors'); // Import the CORS middleware
const bodyParser = require('body-parser');

const productRoute = require('./routes/product');
const categoryRoute = require('./routes/category');
const authRoute = require('./routes/auth');

const authHandler = require('./handlers/auth');

const seed = require('./seeds/product');

const app = express();
app.use(cors()); // Allow all origins; update this for production
const port = 8000;

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

app.get('/api', (req, res) => {
  res.json({
    apiVersion: "1.0",
    message: "Backend API is Ready !"
  });
});

app.get('/api/checkAuth', authHandler.verifyToken, (req, res) => {
  res.json({
    apiVersion: "1.0",
    message: "Check Auth API is Ready !"
  });
});

// Do not change this route
app.post('/api/seed', seed.postRunSeed);

app.use('/api/product', authHandler.verifyToken, productRoute);
app.use('/api/category', authHandler.verifyToken, categoryRoute);
app.use('/api/auth', authRoute);

app.use('*', (req, res) => {
  res.status(404).json({
    error: {
      code: 404,
      message: 'Request not found'
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});