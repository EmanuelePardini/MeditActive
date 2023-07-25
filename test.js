//Test.js contiene ancora errori, ma se avete suggerimenti per impostarlo ne sono ben felice!
const chai = require('chai');
const sinon = require('sinon');
const request = require('supertest');
const app = require('./app');

// Importa i modelli
const { sequelize, User, Goal, Interval } = require('./app');

const expect = chai.expect;

describe('User Management', () => {
  before(async () => {
    // Inserisci i dati di prova (fixture) nel database di test
    await sequelize.sync({ force: true });

    await User.bulkCreate([
      {
        email: 'test1@example.com',
        name: 'Test',
        surname: 'User1'
      },
      {
        email: 'test2@example.com',
        name: 'Test',
        surname: 'User2'
      },
      // Altri dati di prova per i tuoi test
    ]);

    await Goal.bulkCreate([
      {
        goal: 'Test Goal 1'
      },
      {
        goal: 'Test Goal 2'
      },
      // Altri dati di prova per i tuoi test
    ]);

    await Interval.bulkCreate([
      {
        startDate: '2023-07-01',
        endDate: '2023-07-07',
        UserId: 1,
        GoalId: 1,
      },
      {
        startDate: '2023-07-15',
        endDate: '2023-07-21',
        UserId: 2,
        GoalId: 2,
      },
      // Altri dati di prova per i tuoi test
    ]);
  });

  // Test per ottenere tutti gli utenti
  describe('GET /users', () => {
    it('should get all users', (done) => {
      request(app)
        .get('/users')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          // Verifica che la risposta contenga tutti gli utenti
          expect(res.body).to.be.an('array').to.have.lengthOf(2);
          done();
        });
    });
  });

  // Test per creare un nuovo utente
  describe('POST /users', () => {
    it('should create a new user', (done) => {
      const newUser = {
        email: 'newuser@example.com',
        name: 'New',
        surname: 'User',
      };

      request(app)
        .post('/users')
        .send(newUser)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          // Verifica che la risposta contenga l'utente appena creato
          expect(res.body).to.have.property('id');
          expect(res.body.email).to.equal(newUser.email);
          expect(res.body.name).to.equal(newUser.name);
          expect(res.body.surname).to.equal(newUser.surname);
          done();
        });
    });
  });

  // Altri test per l'aggiornamento, la cancellazione e altre funzionalità
});
