const Workout = require('../models/workout.js');
const mongojs = require("mongojs");

module.exports = function(app) {

    // App.get to pull up info for the workouts page
    app.get("/api/workouts", (req, res) => {
        Workout.find({})
            .then(dbWorkout => {
                res.status(200).json(dbWorkout);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    })

    // App.get to pull up info for the range page
    app.get("/api/workouts/range", ({}, res) => {
        Workout.find({
                day: { $gte: new Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000)) }
            })
            .then((dbWorkout) => {
                res.status(200).json(dbWorkout);
            }).catch(err => {
                res.status(400).json(err);
            });
    });

    // App.post to submit new completed workouts
    app.post("/api/workouts", (req, res) => {
        Workout.create(req.body)
            .then((dbWorkout) => {
                res.status(200).json(dbWorkout);
            }).catch(err => {
                res.status(400).json(err);
            });
    });

    // App.put to update workouts by MongoDB _id value and update the exercsise body
    app.put("/api/workouts/:id", (req, res) => {
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
}