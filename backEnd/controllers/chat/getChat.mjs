import database from "../../config/config.mjs"


const getChat = async (req,res)=>{


try {
    const chatCollection = database.collection('chatMessage');
    if (!req.user) {
  console.log("User not authenticated");
  return res.status(401).send({ message: "Unauthorized" });
}
  
    const chat = await chatCollection.find({
        $or:[
            {
                senderId: req?.user?.userId,
                recieverId: req?.params?.recieverId          
            },
            {
                senderId: req?.params?.recieverId,
                recieverId: req?.user?.userId
            }
        ]
    }).sort({ createdAt: -1 }).
    limit(100).
    toArray();

   console.log(chat, req.user._id, req.params.recieverId);

    return res.send({
      data: chat,
      senderId: req.user._id,
      recieverId: req.params.recieverId
    });



} catch (error) {
    res.send({message: error});
}



}

export default getChat;