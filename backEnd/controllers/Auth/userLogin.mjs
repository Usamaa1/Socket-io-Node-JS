import database from "../../config/config.mjs";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config'


const userLogin = async (req,res) => {

    try {
    // Connect to the "sample_mflix" database and access its "movies" collection
    const users = database.collection("users");

    const result = await users.findOne({email: req.body.email});

    if(!result){
       return res.send({message: "User Not Found!"})
    }

    const passwordMatch = await bcrypt.compare(req.body.password, result.password);

    if(passwordMatch){
        
       const token = jwt.sign({
            
            userId: result._id,
            email: result.email,
            userName: result.userName
            
        },process.env.SECRET_KEY,{expiresIn: '1h'})

        res.cookie('token',token,{
            maxAge: 60 * 60 * 1000,
            httpOnly: true,
            secure: false
        })
       return res.send({message: `Login Successfull`, token: token})
    }
    else{
       return res.send({message: 'Invalid Credentials'})
    }
  

  } catch(e) {
     // Close the MongoDB client connection
     console.error(e)
    return res.send(e);
    // await client.close();
  }

}

export default userLogin;