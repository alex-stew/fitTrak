const Workout = require('../models/workout.js');
const mongojs = require("mongojs");
const router = require("express").Router();

// get info for the workouts page
router.get("/api/workouts", (req, res) => {
    Workout.find({})
        .then(dbWorkout => {
            res.status(200).json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
})

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
    Workout.create(req.body)
        .then((dbWorkout) => {
            res.status(200).json(dbWorkout);
        }).catch(err => {
            res.status(400).json(err);
        });
});

// put to update workouts and update the exercsise body
router.put("/api/workouts/:id", (req, res) => {
    Workout.findById(req.params.id)
        .then((workout) => {
            workout.exercises.push(req.body);
            Workout.updateOne({ _id: req.params.id }, workout, (err, result) => {
                res.json(workout);
            });
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

module.exports = router;