import { APP } from "../../services/constant.js";
import { stringDecryption, stringEncryption } from "../../services/functions.js";
import { userModel } from "../user/userModel.js";
import jwt from "jsonwebtoken";

// Controller to login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check if user if there in database or not
    const findUser = await userModel.findOne({ email: email });
    if (!findUser) {
      return res.status(404).json({ message: "User not found" });
    }
    // decrypt the stored password
    const decryptedPassword = await stringDecryption(findUser.password);
    if (decryptedPassword !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // create new jsonwebtoken
    const generatedToken = jwt.sign({ email: email }, APP.JWT_KEY);
    // database query to update token in user document
    await userModel.updateOne({ email: email }, { $set: { token: generatedToken } });
    return res.status(200).json({ message: "Logged in successfully", data: generatedToken });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Controller to signup
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // check if email already exists or not
    const findEmail = await userModel.countDocuments({ email: email });
    if (findEmail > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }
    // database query to insert user
    await userModel.create({ name: name, email: email, password: await stringEncryption(password) });
    return res.status(201).json({ message: "Signed up successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
