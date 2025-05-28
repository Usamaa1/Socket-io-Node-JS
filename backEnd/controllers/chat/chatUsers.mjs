import database from "../../config/config.mjs";

const chatUsers = async (req, res) => {
  try {
    const userCollection = database.collection("users");

    const userList = await userCollection
      .find({}, { projection: { email: 1, userName: 1 } })
      .toArray();
    res.send(userList);
  } catch (error) {
    res.send(error);
  }
};
export default chatUsers;
