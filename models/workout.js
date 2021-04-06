const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema ({
   date: {
     type: Date,
     default: Date.NOW
   },
    exercises: [
        {
          type: {
            type: String,
            trim: true,
            required: "String is Required" 
        },
        name: {
            type: String,
            trim: true,
            required: "String is Required" 
        },
        duration: {
            type: Number,
            required: true
        },
        weight: {
            type: Number,
        },
        
        sets: {
            type: Number,
        },
        distance: {
            type: Number,
        },
        }
      ],

})

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;