const { Client } = require('@elastic/elasticsearch');
const { response } = require('express');
const client = new Client({ node: 'http://localhost:9200' });

const geo_distance_unit = "miles";

function validLatLong(lat, long)
{
    // -90 <= lat <= 90 && -180 <= long <= 180
    return (!isNaN(lat) && !isNaN(long) && Math.abs(lat) <= 90 && Math.abs(long) <= 180)
}; 

module.exports = app => {

    //initial route
    app.get("/", (req, res) => {
        res.json({ message: "RxSavings Coding Challenge Restful API" });
    });

    //find closest pharamcy to input lat and long
    app.get("/closest", (req, res) => {

        if (!validLatLong(req.query.lat, req.query.long))
        {
            throw new Error('Invalid Latitude and Longitude')
        }

        client.search({
            index: 'pharmacy-1',
            size: 1,
            body: {
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
                 "unit":          geo_distance_unit, 
                 "distance_type": "arc" //can use "plane" for faster, slightly more inaccurate results
               }
             }
           ] }
        }, 
        {
            maxRetries: 3
        }, (err, result) => {

            if (err) return res.status(err.statusCode).json({ error: err.toString() });
            if (result.body.hits.total.value ==0) return res.status(404).json({ error: "No Results Found"});

            const es_result = result.body.hits.hits[0]
            const pharmacy = es_result["_source"]
            res.json({"name": pharmacy["name"], "address": pharmacy["address"], "distance": parseFloat(es_result.sort).toFixed(2) + ' ' + geo_distance_unit});
        })
    });
};