const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_SCHEMA || 'postgres',
                                process.env.DB_USER || 'postgres',
                                process.env.DB_PASSWORD || '',
                                {
                                    host: process.env.DB_HOST || 'localhost',
                                    port: process.env.DB_PORT || 5432,
                                    dialect: 'postgres',
                                    dialectOptions: {
                                        ssl: process.env.DB_SSL == "true"
                                    }
                                });
const Person = sequelize.define('Person', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: true
    },
});
module.exports = {
    sequelize: sequelize,
    Person: Person
};
/*
const Pharmacy = function(pharmacy) {
    this.name = pharmacy.name;
    this.address = pharmacy.address;
    this.city = pharmacy.city; 
    this.state = pharmacy.state;
    this.coordinates = "GeomFromText('Point(" + pharmacy.latitude + "," + pharmacy.longitude + ")')"; 
}

//should I have the api create the pharmacies into the database too? 

Pharmacy.create = (newPharmacy, result) => {
    sql.query("INSERT INTO pharmacy SET ?", newPharmacy, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created pharmacy ", { id: res.insertId, ...newPharmacy });
      result(null, { id: res.insertId, ...newPharmacy });
    });
  };

  */ 