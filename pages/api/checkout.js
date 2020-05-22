import Stripe from "stripe";
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
//
import Cart from "../../models/Cart";
import Order from "../../models/Order";

function calculateCartTotal(products) {
  const total = products.reduce((acc, el) => {
    acc += el.product.price * el.quantity;
    return acc;
  }, 0);
  const cartTotal = ((total * 100) / 100).toFixed(2);
  const stripeTotal = Number((total * 100).toFixed(2));

  return { cartTotal, stripeTotal };
}

export default async (req, res) => {
  const paymentData = req.body;

  try {
    // 1) Verify and get user id from token
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    // 2) Find cart based on user id, populate it
    const cart = await Cart.findOne({ user: userId }).populate({
      path: "products.product",
      model: "Product",
    });
    console.log("CHECKOUT cart", cart);
    console.log("CHECKOUT paymentData", req.body.email);

    // 3) Calculate cart totals again from cart products
    const { cartTotal, stripeTotal } = calculateCartTotal(cart.products);
    // 4) Get email from payment data, see if email linked with existing Stripe customer
    const prevCustomer = await stripe.customers.list({
      email: paymentData.email,
      limit: 1,
    });
    const isExistingCustomer = prevCustomer.data.length > 0;
    // 5) If not existing customer, create them based on their email
    let newCustomer;
    if (!isExistingCustomer) {
      newCustomer = await stripe.customers.create({
        email: paymentData.email,
        source: paymentData.id,
      });
    }
    const customer =
      (isExistingCustomer && prevCustomer.data[0].id) || newCustomer.id;
    // 6) Create charge with total, send receipt email
    const charge = await stripe.charges.create(
      {
        currency: "eur",
        amount: stripeTotal,
        receipt_email: paymentData.email,
        customer,
        description: `Checkout | ${paymentData.email} | ${paymentData.id}`,
      },
      {
        idempotency_key: uuidv4(),
      }
    );
    // 7) Add order data to database
    const order = await new Order({
      user: userId,
      email: paymentData.email,
      total: cartTotal,
      products: cart.products,
    }).save();
    console.log("Order", order);
    // 8) Clear products in cart
    await Cart.findOneAndUpdate({ _id: cart._id }, { $set: { products: [] } });
    // 9) Send back success (200) response
    res.status(200).json({ message: "Checkout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Checkout failed" });
  }
};
