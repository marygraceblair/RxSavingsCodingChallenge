var personsRouter = require('./persons'); 

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace',
  apiVersion: '7.2', // use the same version of your Elasticsearch instance
});

module.exports = app => {

    //initial route
    app.get("/", (req, res) => {

        //ensure that the elasticsearch cluster is up
        client.ping({
            // ping usually has a 3000ms timeout
            requestTimeout: 1000
          }, function (error) {
            if (error) {
              console.trace('elasticsearch cluster is down!');
            } else {
              console.log('All is well');
            }
          });
        res.json({ message: "RxSavings Restful API" });
    });

    //test elasticsearch query
    app.get("/", (req, res) => {

        //ensure that the elasticsearch cluster is up
        client.ping({
            // ping usually has a 3000ms timeout
            requestTimeout: 1000
          }, function (error) {
            if (error) {
              console.trace('elasticsearch cluster is down!');
            } else {
              console.log('All is well');
            }
          });
        res.json({ message: "RxSavings Restful API" });
    });



    

};