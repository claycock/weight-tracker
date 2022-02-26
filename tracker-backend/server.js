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
    
    // Change date format
    weight.weight_date = stripDate(req.body.weight_date);

    weight.save()
        .then(weight => {
            res.status(200).json({'weight': 'weight added successfully'});
            console.log('New weight added', req.body);
        })
        .catch(err => {
            res.status(400).send('adding weight failed');
        });
});

weightRoutes.route('/update/:id').post(function(req, res) {
    Weight.findById(req.params.id, function(err, weight) {
        if (!weight)
            res.status(404).send("Data not found");
        else
            req.body.weight_date = stripDate(req.body.weight_date);
            weight.weight_user = req.body.weight_user;
            weight.weight_date = req.body.weight_date;
            weight.weight_lbs = req.body.weight_lbs;
            weight.save().then(weight => {
                res.json('weight updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

weightRoutes.route('/delete/:id').post(function(req, res) {
    Weight.findById(req.params.id, function(err, weight) {
        if (!weight)
            res.status(404).send("Data not found");
        else
            weight.deleteOne();
            res.status(200).send("Deleted")
    })
});

function stripDate(fullDate) {
    let date = new Date(fullDate);
    return (date.getMonth()+1).toString() + "/" + (date.getDate()).toString() + "/" + (date.getFullYear()).toString();
}



app.use('/weights', weightRoutes);

app.listen(PORT, '0.0.0.0', function() {
    console.log("Server is running on Port: " + PORT);
});