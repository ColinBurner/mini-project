const diagnostics = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

// GET Route for retrieving diagnostic information
diagnostics.get('/', (req, res) => {
  // TODO: Logic for sending all the content of db/diagnostics.json
  readFromFile('./db/diagnostics.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a error logging
diagnostics.post('/', (req, res) => {
  // TODO: Logic for appending data to the db/diagnostics.json file
  const { error_type, error_message, timestamp } = req.body;

  if (error_type && error_message && timestamp) {
    const newDiagnostic = {
      id: uuidv4(),
      error_type,
      error_message,
      timestamp,
    };

    readAndAppend(newDiagnostic, './db/diagnostics.json');
    res.json({ status: 'success', body: newDiagnostic });
  } else {
    res.json('Error in posting diagnostic data');
  }
});

module.exports = diagnostics;
