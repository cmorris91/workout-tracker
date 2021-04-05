const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    string: {
        type: String,
        trim: true,
        required: "String is Required" 
    },
    string: {
        type: String,
        trim: true,
        required: "String is Required" 
    },
    number: {
        type: Number,
        required: true
    },
    number: {
        type: Number,
    },
    
    number: {
        type: Number,
    },
    number: {
        type: Number,
    },
})

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;