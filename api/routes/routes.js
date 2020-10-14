var personsRouter = require('./persons'); 
module.exports = app => {

    //initial route
    app.get("/", (req, res) => {
        res.json({ message: "RxSavings Restful API" });
    });


    app.use('/persons', personsRouter);

    

};