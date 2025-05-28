import { MongoClient, ServerApiVersion } from "mongodb";

// Replace the placeholder with your Atlas connection string
const uri = "mongodb://localhost:27017/";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);

const database = client.db("socketDb");


async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch(e) {
    // Ensures that the client will close when you finish/error
    console.log(e)
    await client.close();
  }
}
run();

export default database;