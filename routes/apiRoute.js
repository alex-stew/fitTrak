const router = require("express").Router();
const { Workout } = require('../models/workout');

// get info for the workouts page
router.get("/api/workouts", (req, res) => {
    Workout.find({})
        .then((dbWorkout) => {
            res.status(200).json(dbWorkout);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

// get info for the range page
router.get("/api/workouts/range", ({}, res) => {
    Workout.find({})
    limit(10)
        .then((dbWorkout) => {
            res.status(200).json(dbWorkout);
        }).catch(err => {
            res.status(400).json(err);
        });
});

// post submits new completed workouts
router.post("/api/workouts", ({ body }, res) => {
    Workout.create(body)
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(400).json(err);
        });
});

// put to update workouts and update the exercsise body
router.put("/api/workouts/:id", ({ body, params }, res) => {
    Workout.findByIdAndUpdate(
            params.id, { $push: { exercises: body } }, { new: true, }
        )
        .then((dbWorkout) => {
            res.status(200).json(dbWorkout);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

module.exports = router;