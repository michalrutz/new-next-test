import User from "../../models/User";
import jwt from "jsonwebtoken";
import connectDb from "../../utilis/connectDb";

connectDb();

export default async (req, res) => {
  if (!("authorization" in req.headers)) {
    return res.status(401).send("No authorization token");
  }
  console.log("authorization",req.headers.authorization)
  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    console.log("userId", userId)
    const user = await User.findOne({ _id: userId });
    console.log(user)
    if (user) {
      res.status(200).json({user:user});
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(403).send("Invalid token");
  }
};
