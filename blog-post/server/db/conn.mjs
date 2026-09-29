// Creates ONE MongoClient for the whole application and exports the database
// handle. Opening a new connection per request would exhaust the Atlas
// connection limit very quickly, so the connection is made once at startup
// and reused by every route.
import { MongoClient, ServerApiVersion } from "mongodb";

const URI = process.env.ATLAS_URI || "";
const DB_NAME = process.env.DB_NAME || "blog";

if (!URI) {
  console.error("ATLAS_URI is missing. Create server/.env from .env.example.");
  process.exit(1);
}

const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  await client.connect();
  // ping confirms the credentials and network access actually work,
  // instead of failing later on the first real query.
  await client.db("admin").command({ ping: 1 });
  console.log("Connected to MongoDB Atlas — database:", DB_NAME);
} catch (err) {
  console.error("MongoDB connection failed:", err.message);
  process.exit(1);
}

const db = client.db(DB_NAME);

export default db;
