// bin/migrate.js

var db = require('../api/models/Pharmacy.js');
db.sequelize.sync();