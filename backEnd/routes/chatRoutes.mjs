import express from "express";
import chatUsers from "../controllers/chat/chatUsers.mjs";
import chatMessage from "../controllers/chat/chat.mjs";
import getChat from "../controllers/chat/getChat.mjs";
import me from "../controllers/Auth/me.mjs";
import authMiddleware from "../controllers/middleware/authMiddleware.mjs";
const chatRouter = express.Router();


chatRouter.get('/chatList', chatUsers);
chatRouter.get('/chatMessage/:recieverId',authMiddleware,getChat);
chatRouter.get('/me',authMiddleware,me);
chatRouter.post('/chatMessage',chatMessage);




export default chatRouter;







