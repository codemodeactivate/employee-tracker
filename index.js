const express = require('express');
//const db = require('./config/connection');
//const helpers = require('./db/helpers');
const dbFunctions = require('./utils/inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

dbFunctions.startProgram();


// Start the server
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
