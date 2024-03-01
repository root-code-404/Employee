const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
});

module.exports = mongoose.model('Employee', employeeSchema);
