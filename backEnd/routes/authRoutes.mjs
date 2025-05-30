import express from "express";
import userRegister from "../controllers/Auth/userRegister.mjs";
import userLogin from "../controllers/Auth/userLogin.mjs";

const userRouter = express.Router();


userRouter.post('/register', userRegister);
userRouter.post('/login', userLogin);





export default userRouter;







