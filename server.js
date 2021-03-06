const express = require("express");
const logger = require("morgan");
const mongojs = require("mongojs");
const mongoose = require("mongoose");
const path = require('path');


const PORT = process.env.PORT || 3000;

const db = require("./models");
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

//get route for /exercise

app.get('/exercise', (req,res)=> {
  res.sendFile(path.join(__dirname, 'public/exercise.html'))
})

app.get('/stats', (req,res)=> {
  res.sendFile(path.join(__dirname, 'public/stats.html'))
})

//get route for /stats
//get route for workouts /api/workouts gets all workouts

app.get('/api/workouts', (req, res) => {
 
    db.Workout.find({})
    .then(dbWorkout => {
      console.log(dbWorkout)
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
        console.log(err)
      });
})

//put route for /api/workouts/:id updates one workout in db
app.put('/api/workouts/:id', (req,res)=> {

  db.Workout.findByIdAndUpdate(req.params.id,
    { $push: { exercises: req.body}}, {new: true})
    .then(dbWorkout => {
      console.log(dbWorkout)
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
        console.log(err)
      });
});
//post route for /api/workouts that inserts new workout to db
app.post('/api/workouts', (req, res)=> {
  db.Workout.create(req.body, (err, data) => {
    if(err) {
      console.log(err);
    } else {
      res.json(data);
    }
  })
});

//get route for /api/workouts/range ?

app.get('/api/workouts/range', (req,res)=> {
  db.Workout.find({}).sort({day:-1}).limit(7)
  .then(dbWorkout => {
    console.log(dbWorkout)
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
      console.log(err)
    });
})

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });