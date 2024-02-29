const express = require('express');
const router = express.Router();
const path = require('path');
const Tour = require('../models/Tour');

// Route to render the tours page
router.get('/tours', async (req, res) => {
  try {
    const tours = await Tour.find();
    res.render('tours', { tours });
  } catch (error) {
    console.error('Error fetching tours:', error.message);
    res.status(500).json({ error: 'Internal Server Error 1' });
  }
});

// Route to add a new tour
router.post('/tours/add', async (req, res) => {
  try {
    const { country, description, cost } = req.body;
    const newTour = new Tour({ country, description, cost });
    await newTour.save();
    console.log('Tour added successfully:', newTour);
    res.redirect('/tours');
  } catch (error) {
    console.error('Error adding tour:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Route to delete a tour
router.post('/tours/delete/:id', async (req, res) => {
  try {
    const tourId = req.params.id;
    await Tour.findByIdAndDelete(tourId);
    res.redirect('/tours');
  } catch (error) {
    console.error('Error deleting tour:', error.message);
    res.status(500).json({ error: 'Internal Server Error 3' });
  }
});

// Handle GET requests for other pages
router.get('/:page', (req, res) => {
  const page = req.params.page;
  res.sendFile(`${page}.html`, { root: path.join(__dirname, '../public') });
});

module.exports = router;