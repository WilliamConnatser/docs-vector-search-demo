import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { OpenAIEmbeddings } from "@langchain/openai";
import "dotenv/config";
import { promises as fsp } from "fs";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_ATLAS_URI || "");
const dbName = "docs";
const collectionName = "embeddings";
const collection = client.db(dbName).collection(collectionName);

const docs_dir = "_workshop_assets/fake_docs";
const fileNames = await fsp.readdir(docs_dir);
console.log(fileNames);
for (const fileName of fileNames) {
  const document = await fsp.readFile(`${docs_dir}/${fileName}`, "utf8");
  console.log(`Vectorizing ${fileName}`);

  const splitter = RecursiveCharacterTextSplitter.fromLanguage("markdown", {
    // Chunk size can be tweaked:
    // - The larger the chunk size, the more overhead during search
    // - The smaller the chunk size, the less context you'll have during search
    chunkSize: 500,
    chunkOverlap: 50,
  });
  const output = await splitter.createDocuments([document]);

  await MongoDBAtlasVectorSearch.fromDocuments(output, new OpenAIEmbeddings(), {
    collection,
    indexName: "default",
    textKey: "text",
    embeddingKey: "embedding",
  });
}

console.log("Done: Closing Connection");
await client.close();
