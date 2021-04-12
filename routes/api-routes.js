//db
const db = require('../models')
module.exports = (app) => {
    //get/view all
    app.get("/api/workouts", (req, res) => {
        db.Workout.find({}, (err, workouts) => {
            if (err) {
                console.log(err);
            } else {
                res.json(workouts)
            }
        });
    });
    //add an excerise, setting the id, pushing the to model and setting as true
    app.put("/api/workouts/:workout", ({ params, body }, res) => {
        db.Workout.findOneAndUpdate({ _id: params.id }, { $push: { excercises: body } }, { upsert: true, useFindandModify: false },
            updatedWorkout => {
                res.json(updatedWorkout);
            })
    });
    //creates a new workout
    app.post('/api/workouts', (req, res) => {
        db.Workout.create({}).then(newWorkout => {
            res.json(newWorkout);
        });
    });

}