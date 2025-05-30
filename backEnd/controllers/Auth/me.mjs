const me = (req,res)=>{

    // Add this route to your existing router

  res.send({
    userId: req.user.userId,
    email: req.user.email,
    userName: req.user.userName
  });



}

export default me;