module.exports = app => {

    //initial route
    app.get("/", (req, res) => {
        res.json({ message: "RxSavings Restful API" });
    });

}