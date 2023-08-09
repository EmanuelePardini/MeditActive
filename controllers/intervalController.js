const  Interval  = require('../models/Interval');

//Ottieni tutti gli intervalli
const getInterval = async (req, res) => {
    try {
      const intervals = await Interval.findAll();
      res.json(intervals);
    } catch (error) {
      res.status(500).json({ error: 'Errore durante il recupero degli intervalli' });
    }
  };

//Ottieni gli intervalli filtrati per obiettivi inclusi
const getIntervalFilteredbyGoal = async (req, res) => {
  try {
    const { goalId } = req.params;
    const intervals = await Interval.findAll({
      where: { GoalId: goalId },
    });
    res.json(intervals);
  } catch (error) {
    res.status(500).json({ error: 'Errore durante il recupero degli intervalli' });
  }
};

//Ottieni gli intervalli filtrati per data di inizio e data di fine
const getIntervalFilteredbyDate = async (req, res) => {
  try {
    const { startDate, endDate } = req.params;
    const intervals = await Interval.findAll({
      where: {
        startDate: { [Op.gte]: startDate },
        endDate: { [Op.lte]: endDate },
      },
    });
    res.json(intervals);
  } catch (error) {
    res.status(500).json({ error: 'Errore durante il recupero degli intervalli' });
  }
};


// Crea un nuovo intervallo
const createInterval = async (req, res) => {
  try {
    const { startDate, endDate, userId, goalId } = req.body;
    const interval = await Interval.create({ startDate, endDate, UserId: userId, GoalId: goalId });
    res.json(interval);
  } catch (error) {
    res.status(500).json({ error: 'Errore durante la creazione dell\'intervallo' });
  }
};

// Aggiorna un intervallo esistente
const updateInterval = async (req, res) => {
  try {
    const { id } = req.params;
    const { startDate, endDate, userId, goalId } = req.body;
    const intervalToUpdate = await Interval.findByPk(id);
    if (!intervalToUpdate) {
      return res.status(404).json({ error: 'Intervallo non trovato' });
    }
    intervalToUpdate.startDate = startDate;
    intervalToUpdate.endDate = endDate;
    intervalToUpdate.UserId = userId;
    intervalToUpdate.GoalId = goalId;
    await intervalToUpdate.save();
    res.json(intervalToUpdate);
  } catch (error) {
    res.status(500).json({ error: 'Errore durante l\'aggiornamento dell\'intervallo' });
  }
};

// Cancella un intervallo
const deleteInterval = async (req, res) => {
  try {
    const { id } = req.params;
    const interval = await Interval.findByPk(id);
    if (!interval) {
      return res.status(404).json({ error: 'Intervallo non trovato' });
    }
    await interval.destroy();
    res.json({ message: 'Intervallo cancellato con successo' });
  } catch (error) {
    res.status(500).json({ error: 'Errore durante la cancellazione dell\'intervallo' });
  }
};


module.exports = {
  getInterval,
  getIntervalFilteredbyGoal,
  getIntervalFilteredbyDate,
  createInterval,
  updateInterval,
  deleteInterval
};
