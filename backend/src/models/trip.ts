const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  userId: String,
  data: Array, 
});

module.exports = mongoose.model('Trip', tripSchema);