import connectDb from "../../u/connectDb";
import User from "../../models/User";
import Cart from "../../models/Cart";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import errorHandler from "../../u/errorHandler";
import AppError from "../../u/AppError";

connectDb();

export default async (req, res) => {
  console.log(req.body);
  const body = JSON.parse(req.body); // don't parse the whole req! just the body!!! ONLY in next.
  const { name, email, password } = body;
  console.log(email);

  try {
  //   // 2) Check to see if the user already exists in the db
    const user = await User.findOne({ email });
    if (user) {
      throw new AppError(`User already exists with email ${email}`, 422);
      // return res.status(422).send(`User already exists with email ${email}`);
    }
    if (password.length < 6) {
      throw new AppError(`The password can't be shorter than 6 letter`, 422);
    }
    // 3) --if not, hash their password
    const hash = await bcryptjs.hash(password, 12);
    // 4) create user
    console.log("NAME",name)
    const newUser = await User.create({
      name:name,
      email:email,
      password: hash,
    });
    console.log({ newUser });
    // 5) create cart for new user
    const cart = await Cart.create({ user: newUser._id });
    // 6) create token for the new user
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    //   // 7) send back token
    res.status(201).json({ token, newUser, cart });
  res.status(201).json({msg:"ok"});

  } catch (error) {
    errorHandler(res, error);
  }
};
