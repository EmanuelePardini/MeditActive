CREATE DATABASE MeditActive;

USE MeditActive;

CREATE TABLE Users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(100) NOT NULL,
  name VARCHAR(50) NOT NULL,
  surname VARCHAR(50) NOT NULL
);

CREATE TABLE Intervals (
  id INT PRIMARY KEY AUTO_INCREMENT,
  startDate DATE NOT NULL,
  endDate DATE NOT NULL,
  userId INT,
  goalId INT,
  FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (goalId) REFERENCES Goals(id) ON DELETE CASCADE
);

CREATE TABLE Goals (
  id INT PRIMARY KEY AUTO_INCREMENT,
  Goal VARCHAR(50)
);

INSERT INTO Users values(1,'emanuelepardini4@gmail.com','Emanuele','Pardini');
INSERT INTO Goals values(1,'Easy'),(2,'Medium'),(3,'Hard'),(4,'Chakra Master');
INSERT INTO Intervals values(1,'20230725','20231225',1,1);

SELECT * FROM Users;
SELECT * FROM Goals;
SELECT * FROM Intervals;