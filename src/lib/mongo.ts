// lib/mongo.ts
import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI!; // Changed to match your .env
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// Reuse the global promise across hot reloads in dev
if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise!;
export default clientPromise;
