const  Goal  = require('../models/Goal');

//Ottieni tutti gli obiettivi
const getGoal = async (req, res) => {
    try {
      const goals = await Goal.findAll();
      res.json(goals);
    } catch (error) {
      res.status(500).json({ error: 'Errore durante il recupero degli obiettivi' });
    }
  };

  module.exports = {
    getGoal
  };
