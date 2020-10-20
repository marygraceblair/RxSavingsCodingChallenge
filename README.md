# RxSavingsCodingChallenge

Coding Challenge For RxSavings

Author: MaryGrace Blair

This is a simple Express.js Web API that integrates with pharmacy data stored in an ElasticSearch cluster.
I have provided a python3 script that creates the ElasticSearch index and uploads the pharmacy data found in pharmacies.csv.
You will need to have an ElasticSearch cluster up and running on your localhost on port 9200 (the default for ElasticSearch).

## Requires
   Python3, Node.js, Express.js, ElasticSearch cluster on localhost:9200
   
## Install ElasticSearch
   Please follow the instructions from the ElasticSearch Documentation
   https://www.elastic.co/guide/en/elasticsearch/reference/current/getting-started-install.html
   
## Upload the Data to ElasticSearch
    python3 /elasticsearch/create_indices.py
    #you will need an ElasticSearch cluster on localhost:9200
   
## Start the API
    npm run start
   
   
# API
## Find the closest pharmacy to latitude/longitude input
   ### Request
   `/closest?lat=<LATITUDE>&long=<LONGITUDE>`
   ### Response
   `{"name":<PHARMACY_NAME>,"complete address":<PHARMACY_COMPLETE_ADDRESS>,"distance":<PHARMACY_DISTANCE_FROM_INPUT_IN_MILES>}`

   ### Example
   `curl http://localhost:3000/closest?lat=39&long=-95.685982`
   `{"name":"WALGREENS","complete address":"3696 SW TOPEKA BLVD, TOPEKA, KS 66611","distance":"0.11 miles"}`
   
  
   

   
   


