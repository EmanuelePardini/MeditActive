const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User=require('./User');
const Goal=require('./Goal')

// Definizione del modello per gli intervalli
const Interval = sequelize.define('Intervals', {
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
      timestamps: false, 
    });

    Interval.belongsTo(User);
    Interval.belongsTo(Goal);
    

module.exports = Interval;