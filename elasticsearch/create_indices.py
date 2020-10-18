#use python elastic search module

from datetime import datetime
from elasticsearch import Elasticsearch
import csv
import urllib3
from elasticsearch.helpers import streaming_bulk

es = Elasticsearch()

def create_index(client):
    mapping = '''
    {
    "mappings": {
        "properties": {
                "name": { type: "text" },
                "address": { type: "text" },
                "city": { type: "text" },
                "state": { type: "text" },
                "zip": { type: "keyword"},
                "location": {type: "geo_point"}
            }
        }
    }
    '''
    client.indices.create(index='pharmacy-1', body=mapping, ignore=400)


def generate_documents():
    """Reads the file through csv.DictReader() and for each row
    yields a single document. This function is passed into the bulk()
    helper to create many documents in sequence.
    """

    DATASET_PATH= './pharmacies.csv'
    with open(DATASET_PATH, mode="r") as f:
        reader = csv.DictReader(f)

        
        for row in reader:
            doc = {
                "name": row["name"],
                "address": row["address"],
                "city": row["city"],
                "state": row["state"],
                "zip": row["state"]
            }
            lat = row["latitude"]
            lon = row["longitude"]
            if lat not in ("", "0") and lon not in ("", "0"):
                doc["location"] = {"lat": float(lat), "lon": float(lon)}
            yield doc

def main():
    print("Loading dataset...")

    client = Elasticsearch(
        'localhost',
        port=9200,
    )

    print("Creating an index...")
    create_index(client)

    print("Indexing documents...")
    number_of_docs = 30
    successes = 0
    for ok, action in streaming_bulk(
        client=client, index="pharmacy-1", actions=generate_documents(),
    ):
        successes += ok
    print("Indexed %d/%d documents" % (successes, number_of_docs))


if __name__ == "__main__":
    main()