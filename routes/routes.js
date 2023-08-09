const express = require('express');
const bodyParser = require('body-parser');
const userController = require('../controllers/userController');
const goalController = require('../controllers/goalController');
const intervalController = require('../controllers/intervalController');
const { appPort } = require('../config/config');
const app = express();

// Middleware per gestire i dati JSON nelle richieste
app.use(bodyParser.json());

// Route per gli utenti
app.get('/users', userController.getUserList);
app.post('/users', userController.createUser);
app.post('/users/:id',userController.updateUser);
app.post('/users/:id',userController.deleteUser);

// Route per gli obiettivi
app.get('/goals', goalController.getGoal);

// Route per gli intervalli
app.get('/intervals', intervalController.getInterval);
app.get('/intervals/goals/:goalId', intervalController.getIntervalFilteredbyGoal);
app.get('/intervals/:startDate/:endDate', intervalController.getIntervalFilteredbyDate);
app.post('/intervals', intervalController.createInterval);
app.post('/intervals/:id', intervalController.updateInterval);
app.post('/intervals/:id', intervalController.deleteInterval);

// Avvio del server
app.listen(appPort, () => {
  console.log(`Server in esecuzione sulla porta ${appPort}`);
});

module.exports = app;
