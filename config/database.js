// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('MeditActive', 'root', 'dosl3181', {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize.authenticate()
  .then(() => {
    console.log('Connessione al database MySQL riuscita!');
  })
  .catch(error => {
    console.error('Errore durante la connessione al database:', error);
  });

module.exports = sequelize;
