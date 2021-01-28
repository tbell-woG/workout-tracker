const db = require("../models");

module.exports = function (app) {

    //This route gets the workouts
    app.get("/api/workouts", (req, res) => {

        db.Workout.find({}).then(dbWorkout => {
            dbWorkout.forEach(workout => {
                var total = 0;
                workout.exercises.forEach(e => {
                    total += e.duration;
                });
                workout.totalDuration = total;

            });

            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        });
    });

    // This route adds an exercise
    app.put("/api/workouts/:id", (req, res) => {

        db.Workout.findOneAndUpdate(
            { _id: req.params.id },
            {
                $inc: { totalDuration: req.body.duration },
                $push: { exercises: req.body }
            },
            { new: true }).then(dbWorkout => {
                res.json(dbWorkout);
            }).catch(err => {
                res.json(err);
            });

    });

    //This route creates a workout
    app.post("/api/workouts", ({ body }, res) => {
        db.Workout.create(body).then((dbWorkout => {
            res.json(dbWorkout);
        })).catch(err => {
            res.json(err);
        });
    });

    // This route gets the workouts within the range
    app.get("/api/workouts/range", (req, res) => {

        db.Workout.find({}).then(dbWorkout => {
            console.log("ALL WORKOUTS");
            console.log(dbWorkout);

            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        });

    });
}