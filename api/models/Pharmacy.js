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