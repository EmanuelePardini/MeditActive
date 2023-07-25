const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes, Op } = require('sequelize');
const app = express();
const { appPort } = require('./config'); 
const sequelize = new Sequelize('MeditActive', 'root', 'pw', {
  host: 'localhost',
  dialect: 'mysql',
});
// Verifica la connessione al database
sequelize.authenticate()
  .then(() => {
    console.log('Connessione al database MySQL riuscita!');
  })
  .catch(error => {
    console.error('Errore durante la connessione al database:', error);
  });

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

// Definizione del modello per gli obiettivi
const Goal = sequelize.define('Goals', {
  goal: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
    timestamps: false,
  });

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

// Associazione di un obiettivo ad un intervallo
Interval.belongsTo(User);
Interval.belongsTo(Goal);

// Middleware per gestire i dati JSON nelle richieste
app.use(bodyParser.json());

//Ottieni tutti gli utenti
app.get('/users', async (req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Errore durante il recupero degli utenti' });
    }
  });

// Crea un nuovo utente
app.post('/users', async (req, res) => {
  try {
    const { email, name, surname } = req.body;
    const user = await User.create({ email, name, surname });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Errore durante la creazione dell\'utente' });
  }
});

// Aggiorna un utente esistente
app.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { email, name, surname } = req.body;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'Utente non trovato' });
    }
    user.email = email;
    user.name = name;
    user.surname = surname;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Errore durante l\'aggiornamento dell\'utente' });
  }
});

// Cancella un utente
app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'Utente non trovato' });
    }
    await user.destroy();
    res.json({ message: 'Utente cancellato con successo' });
  } catch (error) {
    res.status(500).json({ error: 'Errore durante la cancellazione dell\'utente' });
  }
});

//Ottieni tutti gli obiettivi
app.get('/goals', async (req, res) => {
    try {
      const goals = await Goal.findAll();
      res.json(goals);
    } catch (error) {
      res.status(500).json({ error: 'Errore durante il recupero degli obiettivi' });
    }
  });

//Ottieni tutti gli intervalli
app.get('/intervals', async (req, res) => {
    try {
      const intervals = await Interval.findAll();
      res.json(intervals);
    } catch (error) {
      res.status(500).json({ error: 'Errore durante il recupero degli intervalli' });
    }
  });

//Ottieni gli intervalli filtrati per obiettivi inclusi
app.get('/intervals/goals/:goalId', async (req, res) => {
  try {
    const { goalId } = req.params;
    const intervals = await Interval.findAll({
      where: { GoalId: goalId },
    });
    res.json(intervals);
  } catch (error) {
    res.status(500).json({ error: 'Errore durante il recupero degli intervalli' });
  }
});

//Ottieni gli intervalli filtrati per data di inizio e data di fine
app.get('/intervals/:startDate/:endDate', async (req, res) => {
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
});


// Crea un nuovo intervallo
app.post('/intervals', async (req, res) => {
  try {
    const { startDate, endDate, userId, goalId } = req.body;
    const interval = await Interval.create({ startDate, endDate, UserId: userId, GoalId: goalId });
    res.json(interval);
  } catch (error) {
    res.status(500).json({ error: 'Errore durante la creazione dell\'intervallo' });
  }
});

// Aggiorna un intervallo esistente
app.put('/intervals/:id', async (req, res) => {
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
});

// Cancella un intervallo
app.delete('/intervals/:id', async (req, res) => {
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
});

// Avvio del server
app.listen(appPort, () => {
    console.log(`Server in esecuzione sulla porta ${appPort}`);
  });

// Esporta l'applicazione
module.exports = app;
module.exports = {
    sequelize,
    User,
    Goal,
    Interval,
  };

/*

TEMPLATE DA USARE PER TESTARE LE OPERAZIONI CRUD SU CONSOLE

INSERIMENTO

const newUser = {
  email: 'nuovaemail@example.com',
  name: 'Nuovo',
  surname: 'Utente'
};

fetch('http://localhost:3000/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(newUser)
})
  .then(response => response.json())
  .then(data => {
    console.log('Nuovo utente creato:', data);
  })
  .catch(error => {
    console.error('Errore durante la creazione dell\'utente:', error);
  });

===============================================================================

  AGGIORNAMENTO

app.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { email, name, surname } = req.body;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'Utente non trovato' });
    }
    user.email = email;
    user.name = name;
    user.surname = surname;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Errore durante l\'aggiornamento dell\'utente' });

===============================================================================

    CANCELLAZIONE

const userId = 1;

fetch(`http://localhost:3000/users/${userId}`, {
  method: 'DELETE',
})
  .then(response => {
    if (response.ok) {
      console.log('Utente cancellato con successo');
    } else {
      console.error('Errore durante la cancellazione dell\'utente');
    }
  })
  .catch(error => {
    console.error('Errore durante la cancellazione dell\'utente:', error);
  });


  */