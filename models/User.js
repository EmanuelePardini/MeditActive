const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Definizione del modello per l'utente
const User = sequelize.define('Users', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
      timestamps: false, // Disabilita l'aggiunta automatica di createdAt e updatedAt
    });

module.exports = User;