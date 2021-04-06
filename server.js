const express = require("express");
const logger = require("morgan");
const mongojs = require("mongojs");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

// routes here
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
  db.Workout.updateOne(
    {
      _id: mongojs.ObjectID(req.params._id)
    },
    {
      $push: {
        exercises: [
          {
            ...req.body
            // type: req.body.type,
            // name: req.body.name,
            // duration: req.body.duration,
            // weight: req.body.weight,
            // reps: req.body.reps,
            // sets: req.body.sets,
            // distance: req.body.distance
          }
        ]
      }
}),
(err, data) => {
  if(err) {
    console.log(err);
  } else {
    res.json(data);
  }
} 
})



//post route for /api/workouts that inserts new workout to db

// get route for /api/workouts/range ?
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });