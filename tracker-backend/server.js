const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const weightRoutes = express.Router();

let Weight = require('./weight.model')

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/weight', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

weightRoutes.route('/').get(function(req, res) {
    Weight.find(function(err, weights) {
        if (err) {
            console.log(err);
        } else {
            res.json(weights);
        }
    });
});

weightRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Weight.findById(id, function(err, weight) {
        res.json(weight);
    });
});

weightRoutes.route('/add').post(function(req, res) {
    let weight = new Weight(req.body);
    weight.save()
        .then(weight => {
            res.status(200).json({'weight': 'weight added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding weight failed');
        });
});

weightRoutes.route('/update/:id').post(function(req, res) {
    Weight.findById(req.params.id, function(err, weight) {
        if (!weight)
            res.status(404).send("data is not found");
        else
            weight.weight_description = req.body.weight_user;
            weight.weight_responsible = req.body.weight_date;
            weight.weight_priority = req.body.weight_lbs;
            weight.save().then(weight => {
                res.json('weight updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});




app.use('/weights', weightRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});