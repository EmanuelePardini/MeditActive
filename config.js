module.exports = {
    appPort: process.env.APP_PORT || 3000, // Utilizza la porta da variabile d'ambiente, altrimenti usa la porta 3000 per l'applicazione
    testPort: process.env.TEST_PORT || 3001 // Utilizza la porta da variabile d'ambiente, altrimenti usa la porta 3001 per i test
  };
  