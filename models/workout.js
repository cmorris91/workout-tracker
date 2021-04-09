const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema ({
   day: {
     type: Date,
     default: Date.now
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
        reps: {
            type: Number,
        },

        distance: {
            type: Number,
        },
        }
      ],
    })

WorkoutSchema.virtual("totalDuration").get(function() {
return this.exercises.reduce((total, exercise) => {
        return total + exercise.duration;
    }, 0);
})

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;