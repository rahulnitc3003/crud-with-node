var express = require('express');
var Hobby = require('../models/hobby');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.post('/add_hobby', function(req, res, next) {
    req.checkBody('name', '* Name Required').notEmpty();
    req.checkBody('type', '* Type Required').notEmpty();
    req.checkBody('favorite', '* favorite Required').notEmpty();
    var errors = req.validationErrors();

    if (errors) {
        res.json({
            error: errors,
            status: 204
        });
    } else {
        var name = req.body.name;
        var type = req.body.type;
        var favorite = req.body.favorite;
        let hobbyData = new Hobby({ name, type, favorite });
        console.log(hobbyData.id);
        hobbyData.save((error, result) => {
            if (error) {
                console.log(error);
                res.json({
                    error: error,
                    status: 400
                });
            } else {
                res.json({
                    status: res.statusCode,
                    message: "Record Inserted",
                    data: hobbyData
                });
            }
        });
    }
});

router.get('/record', (req, res, next) => {
    Hobby.find({}, (error, result) => {
        if (error) {
            console.log("Error in fetching record", error);
        } else {
            res.render('record', {
                recordList: result
            });
        }
    });
});

router.get('/record/:id', (req, res, next) => {
    var id = req.params.id;
    Hobby.findOne({ '_id': id }, (err, result) => {
        if (err) {
            console.log("error in fetch Record details", err);
            res.json({
                status: 400,
                error: err
            });
        } else if (!result) {
            res.json({
                status: 204,
                data: result,
                message: 'Record not found'
            });
        } else {
            res.json({
                status: 200,
                data: result
            });
        }
    });
});


router.put('/record/:id', (req, res, next) => {
    var id = req.params.id;
    var name = req.body.name;
    var type = req.body.type;
    var favorite = req.body.favorite;

    req.checkBody('name', '* Name Required').notEmpty();
    req.checkBody('type', '* Type Required').notEmpty();
    req.checkBody('favorite', '* Favorite Required').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        console.log(errors);
        res.json({
            status: 400,
            message: errors
        });
    } else {
        var query = { _id: id };
        var data = {
            name: name,
            type: type,
            favorite: favorite
        };
        Hobby.updateOne(query, data, (err, result) => {
            if (err) {
                console.log(err);
                res.json({
                    status: 400,
                    error: err
                });
            } else {
                console.log(result);
                res.json({
                    status: 200,
                    message: 'Data Successfully Updated',
                    data: data
                });
            }
        });
    }
});


router.delete('/record/:id', (req, res, next) => {
    var id = req.params.id;
    Hobby.findOne({ '_id': id }, (err, result) => {
        if (err) {
            res.json({
                status: 400,
                error: err
            });
        } else if (!result) {
            res.json({
                status: 204,
                message: 'Record Not Found'
            });
        } else {
            Hobby.deleteOne({ _id: id }, (error, result) => {
                if (error) {
                    res.json({
                        status: 400,
                        error: error
                    });
                } else {
                    res.json({
                        status: 200,
                        success: true,
                        message: 'Record successfully deleted'
                    });
                }
            });
        }
    });
});

module.exports = router;