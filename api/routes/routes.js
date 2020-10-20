const { Client } = require('@elastic/elasticsearch');
const { response } = require('express');
const client = new Client({ node: 'http://localhost:9200' });

//currently using miles
//for other options, see elastic search documentation
//https://www.elastic.co/guide/en/elasticsearch/reference/current/common-options.html#distance-units
const geo_distance_unit = "miles";
  
module.exports = app => {

    //initial route
    app.get("/", (req, res) => {
        run().catch(console.log)
        res.json({ message: "RxSavings Restful API" });
    });

    //find closest pharamcy to input lat and long
    app.get("/find_closest", (req, res) => {
        
         client.search({
            index: 'pharmacy-1',
            size: 1,
            body: { "track_scores": true,
                "size":1,
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
                 "unit":          unit, 
                 "distance_type": "plane" 
               }
             }
           ] }
          }, {
            ignore: [404],
            maxRetries: 3
          }, (err, result) => {
            if (err) console.log(err)
            const es_result = result.body.hits.hits[0]
            const pharmacy = es_result["_source"]
            res.json({"name": pharmacy["name"], "address": pharmacy["address"], "distance": parseFloat(es_result.sort).toFixed(2) + ' ' + unit});
          })
    });
};