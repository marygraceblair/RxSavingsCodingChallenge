
#most of this code is adapted from the official documentation for the python elasticsearch library
#the original code can be found here: https://github.com/elastic/elasticsearch-py/tree/master/examples/bulk-ingest

from datetime import datetime
from elasticsearch import Elasticsearch
import csv
import urllib3
from elasticsearch.helpers import streaming_bulk

es = Elasticsearch()

def valid_lat_long(lat, long):
    return lat != "" and long != "" and abs(float(lat)) <= 90 and abs(float(long)) <= 180

def create_index(client):
    config = '''
    {
    "settings": {
        "number_of_shards": 1
    },
    "mappings": {
        "properties": {
                "name": { "type": "text" },
                "address": { "type": "text" },
                "city": { "type": "text" },
                "state": { "type": "text" },
                "zip": { "type": "keyword"},
                "location": { "type": "geo_point"}
            }
        }
    }
    '''
    client.indices.create(index='pharmacy-1', body=config)


def generate_documents():
    """Reads the file through csv.DictReader() and for each row
    yields a single document. This function is passed into the bulk()
    helper to create many documents in sequence.
    """

    global num_of_documents
    num_of_documents = 0
    DATASET_PATH= './pharmacies.csv'
    with open(DATASET_PATH, mode="r") as f:
        reader = csv.DictReader(f)

        for row in reader:
            num_of_documents += 1
            doc = {
                "name": row["name"],
                "address": row["address"],
                "city": row["city"],
                "state": row["state"],
                "zip": row["state"],
            }
            lat = row["latitude"]
            lon = row["longitude"]

            if valid_lat_long(lat, lon):
                doc["location"] = {"lat": float(lat), "lon": float(lon)}
            yield doc

def main():
    print("Loading dataset...")

    client = Elasticsearch(
        'localhost',
        port=9200,
    )

    print("Creating an index...")
    try: 
        create_index(client)
    except Exception as err:
        print(err)
        return 
    
    print("Indexing documents...")
    successes = 0
    for ok, action in streaming_bulk(
        client=client, index="pharmacy-1", actions=generate_documents(),
    ):
        successes += ok
    print("Indexed %d/%d documents" % (successes, num_of_documents))
    
if __name__ == "__main__":
    main()