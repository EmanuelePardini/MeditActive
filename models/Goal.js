const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Definizione del modello per gli obiettivi
const Goal = sequelize.define('Goals', {
    goal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
      timestamps: false,
    });

module.exports = Goal;
