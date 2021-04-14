const router = require('express').Router();
const Workout = require('./models/workout');

router.get("/api/workouts", (req, res) => {
    Workout.find({})
        .sort({ date: 1 })
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

//creates a new workout
router.post('/api/workouts', (req, res) => {
    Workout.create({ day: Date.now() })
        .then(newWorkout => {
            res.json(newWorkout);
        }).catch(err => {
            res.json(err);
        });
});

// get range result for total duration and weight
router.get("api/workouts/range", (req, res) => {
    Workout.find({})
        .sort({ date: 1 })
        .then(dbWorkout => {
            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        })
});


// //add an excerise, setting the id, pushing the to model and setting as true
// router.put("/api/workouts/:id", (req, res) => {
//     Workout.create(req.body)
//         .then((data) => db.Workout.findOneAndUpdate({ _id: params.id }, {
//             $push: {
//                 excercises: data._id
//             },

//             $inc: {
//                 totalDuration: data.duration
//             }
//         }, { new: true }), )
//         .then(updatedWorkout => {
//             res.json(updatedWorkout);
//         }).catch(err => {
//             res.json(err);
//         });
// });

module.exports = router;