import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;
import jwt from "jsonwebtoken";
import chalk from "chalk";
import nextConnect from "next-connect";
const handler = nextConnect();
//my
import Cart from "../../models/Cart";
import AppError from "../../u/AppError";
import errorHandler from "../../u/errorHandler";
import connectDb from "../../u/connectDb";

connectDb();

handler
  .use(async (req, res, next) => {
    try {
      if (!("authorization" in req.headers)) {
        throw new AppError("No authorization token", 401);
      }
      const { userId } = jwt.verify(
        req.headers.authorization,
        process.env.JWT_SECRET
      );
      req.userId = userId;
    } catch (error) {
      errorHandler(res, error);
    }
    next();
  })
  .get(async (req, res) => {
    const cart = await Cart.findOne({ user: req.userId }).populate({
      path: "products.product",
      model: "Product",
    });
    res.status(200).json(cart.products);
  })
  .put(async (req, res) => {
    const data = JSON.parse(req.body);
    const { quantity, productId } = data.product;

    try {
      // Get user cart based on userId
      const cart = await Cart.findOne({ user: req.userId });
      console.log(chalk.magenta("CART", cart));

      // Check if product already exists in cart
      const productExists = cart.products.some(
        (cart) => cart.product == productId // in the cart only products Id is stored
      );
      console.log(
        productExists
          ? "updating the quantity of the product in the cart"
          : "adding new product to the cart"
      );
      // // If so, increment quantity (by number provided to request)
      if (productExists) {
        await Cart.findOneAndUpdate(
          { _id: cart._id, "products.product": productId },
          { $inc: { "products.$.quantity": quantity } }
        );
      } else {
        // If not, add new product with given quantity
        const newProduct = { quantity, product: productId };
        await Cart.findOneAndUpdate(
          { _id: cart._id },
          { $addToSet: { products: newProduct } }
        );
      }
      res.status(200).json({ message: "Cart updated" });
    } catch (error) {
      console.error(error);
      res.status(403).json({ message: "Please login again" });
    }
  })
  .delete(async (req, res) => {
    try {
      const cart = await Cart.findOne({ user: req.userId });
      const cartUpdated = await Cart.findOneAndUpdate(
        { _id: cart._id },
        { $pull: { products: { product: req.query._id } } },
        { new: true }
      ).populate({
        path: "products.product",
        model: "Product",
      });
      res.status(200).json({ cart: cartUpdated });
    } catch (error) {
      errorHandler(res, error);
    }
  });

export default handler;
