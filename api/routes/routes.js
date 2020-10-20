

const { Client } = require('@elastic/elasticsearch');
const { response } = require('express');
const client = new Client({ node: 'http://localhost:9200' });
  
module.exports = app => {

    //initial route
    app.get("/", (req, res) => {
        run().catch(console.log)
        res.json({ message: "RxSavings Restful API" });
    });

    //closest geo point with params
    app.get("/closest_with_params", (req, res) => {
        
        client.search({
            index: 'pharmacy-1',
            size: 1,
            body: { "size":1,
            "query": {
                "match_all":{}    
            },
           "sort": [
             {
               "_geo_distance": {
                 "location": { 
                   "lat": req.query.lat, 
                   "lon": req.query.long
                 },
                 "order":         "asc",
                 "unit":          "km", 
                 "distance_type": "plane" 
               }
             }
           ] }
          }, {
            ignore: [404],
            maxRetries: 3
          }, (err, result) => {
            if (err) console.log(err)
            res.json({"name": result.body.hits.hits[0]["_source"]["name"], "address": result.body.hits.hits[0]["_source"]["address"]});
          })

          
        
    });
};