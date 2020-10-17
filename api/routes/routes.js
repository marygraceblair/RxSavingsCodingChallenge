var personsRouter = require('./persons'); 

const { Client } = require('@elastic/elasticsearch');
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
  
module.exports = app => {

    //initial route
    app.get("/", (req, res) => {

        run().catch(console.log)
        res.json({ message: "RxSavings Restful API" });
    });
};