import jwt from 'jsonwebtoken'
import 'dotenv/config'




const authMiddleware = (req,res,next)=>{
    const token = req.cookies.token;

    if(!token){
      return  res.send({message: 'Token Expires'})
    }

    try{

        
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded
        next();
    }
    catch(e){
    return res.status(403).json({ message: 'Token invalid or expired' });
    }



}

export default authMiddleware;