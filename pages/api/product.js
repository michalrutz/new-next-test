import connectDb from "../../u/connectDb";
connectDb();
import Product from "../../models/Product";
import errorHandler from "../../u/errorHandler";

const fs = require("fs");
const multer = require("multer");

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
      break;
    case "POST":
      await handlePostRequest(req, res);
      break;
    case "DELETE":
      await deleteProduct(req, res);
      break;
    default:
      break;
  }
};

const handleGetRequest = async (req, res) => {
  const product = await Product.findById(req.query._id);
  res.status(200).json(product);
};

const upload = multer();


const handlePostRequest = async (req, res) => {
  try {
    const data = JSON.parse(req.body);
    console.log("DATA -> ", data);
    const product = await Product.create(data.product);
    res.status(200).json(product);
  } catch (err) {
    errorHandler(res, err);
  }
};

const deleteProduct = async (req, res) => {
  const _id = req.query._id
  await Product.findByIdAndDelete(_id);
  // delete the local file
  const path = `${process.env.ROOT}/public/img/products/productImage-${_id}.jpeg`
  if(fs.existsSync(path)){
    fs.unlink(path, (err) => {
      if (err) throw err;
      console.log("successfully deleted " + path);
    });
  }
  res.status(204).json({ success: "successfully deleted " + _id + "!" });
};
