import { chatModel } from "../DB/Mongo/models/chatSchema.js";

const createUser = async (userData) => {
  console.log(userData);
  try {
    let userExist = await chatModel.findOne({ user: userData.user });
    if (userExist) {
      userExist.message.push(userData.message);
      await userExist.save();
      return userExist;
    } else {
      let userCreated = await chatModel.create(userData);
      return userCreated;
    }
  } catch (error) {
    console.log(error);
  }
};

export default { createUser };
