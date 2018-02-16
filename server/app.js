const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./db.js');
const bear = require('./bear.js');
const router = express.Router();
const path = require('path');

const port = 9001;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', router);

app.get('/', function(req, res) {
    console.log('Serving up Index.html');
    res.sendFile(path.join(__dirname + '/../client/index.html'));
});

app.get('/bundle.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/../client/bundle.js'));
});

router.route('/bears')
    .post(function(req, res) {
        let myBear = new bear();
        myBear.name = req.body.name;
        myBear.save(function(err) {
            if (err) {
                console.log(err);
                res.end();
            } else {
                res.json({message: 'bear named ' + myBear.name + 'added to db!'});
                res.end();
            }
        })
    })
    .get(function(req, res) {
        bear.find(function(err, bears) {
            if (err) {
                console.log(err);
                res.end();
            } else {
                res.json({bears});
                res.end();
            }
        })
    })

router.route('/bears/:name')
    .get(function(req, res) {
        bear.find({name: req.params.name}, function(err, myBear) {
            if (err) {
                console.log(err);
                res.end();
            } else {
                res.json({myBear});
                res.end();
            }
        })
    })
    .delete(function(req, res) {
        bear.remove({name: req.params.name}, function(err) {
            if (err) {
                console.log(err);
                res.end();
            } else {
                res.json({message: 'Removed ' + req.params.name});
                res.end();
            }
        })
    })


app.listen(port);
console.log('We are listening on port', port);