const  User  = require('../models/User');

const getUserList = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Errore durante il recupero degli utenti' });
  }
};

const createUser = async (req, res) => {
  try {
    const { email, name, surname } = req.body;
    const user = await User.create({ email, name, surname });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Errore durante la creazione dell\'utente' });
  }
};



// Aggiorna un utente esistente
const updateUser = async (req, res) => {
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
};

// Cancella un utente
const deleteUser = async (req, res) => {
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
};

module.exports = {
  getUserList,
  createUser,
  updateUser,
  deleteUser
};
