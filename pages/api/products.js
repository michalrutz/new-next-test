// import products from "../../static/products.json";
import connectDb from "../../u/connectDb";
connectDb();
import Product from "../../models/Product";

export default async (req, res) => {
  let sort = "";
  let filter = {};
  if (req.query) {
    sort = { [req.query.val]: req.query.order };
    if (req.query.filter) {
      let f = req.query.filter;
      filter = { nameSimple: { $regex: `.*${f}.*` } };
    }
  }
  let products = await Product.find(filter).sort(sort);

  res.status(200).json(products);
};
