const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bears');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('once', function() {
    console.log('Database is connected and listening on Port 27017');
});

module.exports = {db};