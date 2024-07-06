# Workshop Demo Application - Let AI Be Your Docs

This is a demo application for the [Let AI Be Your Docs](https://github.com/mongodb-developer/vector-search-workshop) workshop.

Run `npm run embed` which runs `./createEmbeddings.mjs`

After running `npm run embed` make sure to create a MongoDB Atlas Vector Search Index using:

```
{
  "fields": [{
    "type": "vector",
    "path": "embedding",
    "numDimensions": 1536,
    "similarity": "cosine"
  }]
}
```

Note: `numDimensions` is specific to the embedding model that you use so it will be different depending on what's used. `path` is the MongoDB field. `similarity`

# Keeping your embeddings up to date

You set up a MongoDB Trigger to automatically create new embeddings and dump them into your database.
