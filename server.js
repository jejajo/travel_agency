const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect("mongodb://alibek:123alibek@cluster0.333fvhl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Set EJS as the view engine
app.set('view engine', 'ejs');
// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Use middleware to parse JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use middleware to serve static files from the 'public' folder
app.use(express.static('public'));

// Import and use the travelRoutes
const travelRoutes = require('./routes/travelRoutes');
app.use('/', travelRoutes);

app.get('/weather', async (req, res) => {
  try {
    const apiKey = '28be6d9b0ad44368b9f192058242301 ';
    const city = req.query.city || 'New York';

    const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);

    const weatherData = {
      location: response.data.location.name,
      temperature: response.data.current.temp_c,
      condition: response.data.current.condition.text,
    };

    res.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Set up the server to listen on port 3000
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
