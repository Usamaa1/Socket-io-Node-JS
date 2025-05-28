import database from "../../config/config.mjs"

const chatMessage = async (req,res)=>{

    try {

        const {senderId, senderName, recieverId, recieverName, message} = req.body;

        const chatCollection = database.collection('chatMessage');

        if(!senderId || !senderName || !recieverId || !recieverName || !message){
            return res.send("All feilds Required!");
        }

        const chatMessageObj = {
            senderId,
            senderName,
            recieverId,
            recieverName,
            message,
            createdAt: new Date()
        }

        const result = await chatCollection.insertOne(chatMessageObj);

       return res.send({message: `Message sent!`});
        
        
    } catch (error) {
        res.send({message: `Message sending failed ${error}`});
    }



}

export default  chatMessage;