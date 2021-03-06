var express = require('express');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();



var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);

require('./server/config/mongoose')(config);

require('./server/config/passport')();

require('./server/config/routes')(app);

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "https://elite-schedule.azure-mobile.net/tables/leagues");
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
//   next();
// });

app.listen(config.port);
console.log('Listening on port ' + config.port + '...');