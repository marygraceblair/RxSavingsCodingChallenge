var personsRouter = require('./persons'); 
const { Client } = require('@elastic/elasticsearch'); 
const client = new Client({ node: 'http://localhost:5601' }); 
module.exports = app => {

    //initial route
    app.get("/", (req, res) => {

        //async function run () {

        //    await client.indices.refresh({ index: 'pharmacy' })
          // Let's search!
          const { body } = client.search({
            index: 'pharmacy',
            // type: '_doc', // uncomment this line if you are using Elasticsearch ≤ 6
            body: {
              query: {
                match: { address: '1740 SW WANAMAKER ROAD' }
              }
            }
          });
          
          console.log(body);
          //}
        res.json({ message: "RxSavings Restful API" });
    });


    //app.use('/persons', personsRouter);

    

};