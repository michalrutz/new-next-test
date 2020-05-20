// import products from "../../static/products.json";
import connectDb from "../../u/connectDb";
connectDb();
import Product from "../../models/Product";

export default async (req, res) => {
  let sort = "";

  if (req.query) {
    sort = { [req.query.val]: req.query.order };
  }
  let products = await Product.find().sort(sort);

  res.status(200).json(products);
};
