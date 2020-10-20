

const { Client } = require('@elastic/elasticsearch');
const { response } = require('express');
const client = new Client({ node: 'http://localhost:9200' });

async function run () {
    
    // Let's search!
    const { body } = await client.search({
      index: 'pharmacy-1',
      body: {
        query: {
          match_all: {
            
          }
        }
      }
    })
    console.log(body.hits.hits)
}

async function closest_geo_point () {
    
    // Let's search!
    const { body } = await client.search({
      index: 'pharmacy-1',
      body: 
      {
        "size":1,
        "query": {
            "match_all":{}    
        },
       "sort": [
         {
           "_geo_distance": {
             "location": { 
               "lat": 39.03504, 
               "lon": -95.7587
             },
             "order":         "asc",
             "unit":          "km", 
             "distance_type": "plane" 
           }
         }
       ]   
      }
    })
    console.log(body.hits.hits)
    //body.hits.hits.forEach(function(hit){
    //    console.log(hit);
    // })
    //return body.hits.hits
}
async function closest_geo_point_params (lat, long) {
    
    // Let's search!
    const { body } = await client.search({
      index: 'pharmacy-1',
      body: 
      {
        "size": 1,
        "query": {
            "match_all":{}    
        },
       "sort": [
         {
           "_geo_distance": {
             "location": { 
               "lat": lat, 
               "lon": long
             },
             "order":         "asc",
             "unit":          "km", 
             "distance_type": "plane" 
           }
         }
       ]   
      }
    })
    //resolve(body.hits.hits)
    //console.log(body.hits.hits)
}
  
module.exports = app => {

    //initial route
    app.get("/", (req, res) => {
        run().catch(console.log)
        res.json({ message: "RxSavings Restful API" });
    });

    //closest geo point
    app.get("/closest", (req, res) => {
        
        //closest_geo_point().then((response) => { res.json({ message: response});})
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
                   "lat": 39.03504, 
                   "lon": -95.7587
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