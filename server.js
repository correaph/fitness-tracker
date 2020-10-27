const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const mongojs = require("mongojs");
var path = require("path");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

// Gets all the workout records from mongodb
app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then(dbResp => {
      res.json(dbResp);
    })
    .catch(err => {
      res.json(err);
    });
});

// Gets all the workout records from mongodb
app.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
    .then(dbResp => {
      res.json(dbResp);
    })
    .catch(err => {
      res.json(err);
    });
});

// Inserts a new exercise into workouts collection, using its id
app.put("/api/workouts/:id", (req, res) => {
  db.Workout.update(
    {
      _id: mongojs.ObjectId(req.params.id)
    },
    {
      $push: {exercises: req.body }
    }).then(dbUser => {
      res.json(dbUser);
    }).catch(err => {
      res.json(err);
    });
});

// Creates a new workout document and return its id for frontend use
app.post("/api/workouts", (req, res) => {
  db.Workout.create({
    day: new Date()
  }).then(dbUser => {
    res.json(dbUser);
  }).catch(err => {
    res.json(err);
  });
});

// Redirects browser to exercise page
app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

// Redirects browser to stats page
app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/stats.html"));
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});