const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [{
        type: {
            type: String,
            required: "What category of exercise are you performing?"
        },
        name: {
            type: String,
            required: "What is the name of this exercise?"
        },
        distance: {
            type: Number
        },
        duration: {
            type: Number,
            required: "How long did this exercise take?"
        },
        weight: {
            type: Number
        },
        sets: {
            type: Number
        },
        reps: {
            type: Number
        },
        totalDuration: {
            type: Number
        },
    }],
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;