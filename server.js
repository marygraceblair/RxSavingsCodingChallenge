const express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

app.listen(port);

console.log('RxSavings RESTful API server started on: ' + port);

//import and register routes
const routes = require('./api/routes/routes');
routes(app);

