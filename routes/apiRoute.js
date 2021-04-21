const { Workout } = require('../models/workout.js');
const mongojs = require("mongojs");
const router = require("express").Router();

// get info for the workouts page
router.get("/api/workouts", (req, res) => {
    Workout.find({}).then(dbWorkout => {
        const result = dbWorkout.map(workout => {
            const workoutEl = workout.toObject();
            workoutEl.totalDuration = workout.exercises.reduce((totalDuration, exercise) => totalDuration + exercise.duration, 0);

            return workout;
        });

        res.status(200).json(dbWorkout);
    }).catch(err => {
        res.status(400).json(err);
    })
});


// get info for the range page
router.get("/api/workouts/range", ({}, res) => {
    Workout.find({
            day: { $gte: new Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000)) }
        })
        .then((dbWorkout) => {
            res.status(200).json(dbWorkout);
        }).catch(err => {
            res.status(400).json(err);
        });
});

// post submits new completed workouts
router.post("/api/workouts", (req, res) => {
    const workout = req.body;

    Workout.create(workout)
        .then((result) => {
            res.status(200).json(result);
        }).catch(err => {
            res.status(400).json(err);
        });
});

// put to update workouts and update the exercsise body
router.put("/api/workouts/:id", (req, res) => {
    const exercise = req.body;
    const workoutId = req.params.id;

    Workout.findById(workoutId)
        .then((workout) => {
            workout.exercises.push(exercise);
            workout.save().then(res => {
                res.json(res);
            });
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

module.exports = router;