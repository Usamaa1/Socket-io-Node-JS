import database from "../../config/config.mjs";
import bcrypt from 'bcrypt';

const userRegister = async (req,res) => {

    try {
    // Connect to the "sample_mflix" database and access its "movies" collection
    const users = database.collection("users");

    
    bcrypt.hash(req.body.password, 10, async function(err, hash) {
    // Store hash in your password DB.
     const userCollection = {
     userName: req.body.userName,
     email: req.body.email,
     password: hash
    }
    const result = await users.insertOne(userCollection);
    // Insert the defined document into the "movies" collection
});
    // Create a document to insert
   
    // Print the ID of the inserted document
    // console.log(`A document was inserted with the _id: ${result.insertedId}`);
    res.send(`A document was inserted`)
    // res.send(`A document was inserted with the _id: ${result.insertedId}`)
  } catch(e) {
     // Close the MongoDB client connection
     console.error(e)
     res.send(e);
    // await client.close();
  }

}

export default userRegister;