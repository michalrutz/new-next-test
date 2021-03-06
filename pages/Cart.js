//SASS
import "../public/static/_shopingcart.scss";

import { parseCookies } from "nookies";
import Router from "next/router";
import Link from "next/link";

import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import cookie from "js-cookie";
import fetch from "node-fetch";
//my
import baseUrl from "../u/baseUrl";

function Cart({ user, products }) {
  const [cartAmount, setCartAmount] = React.useState(0);
  const [stripeAmount, setStripeAmount] = React.useState(0);
  const [isCartEmpty, setCartEmpty] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [Products, setProducts] = React.useState(products);
  console.log("Products", Products);

  const deleteProduct = async (_id) => {
    console.log("delete", _id);
    const token = cookie.get("token");
    const url = baseUrl + "/api/cart?_id=" + _id;
    console.log(url);

    const res = await fetch(url, {
      method: "DELETE",
      headers: { Authorization: token },
    });
    const data = await res.json();
    if (data.cart) {
      setProducts(data.cart.products);
      console.log("data", data.cart.products);
    } else if (data.errorMsg) {
      console.log(data.errorMsg);
    }
  };

  async function handleCheckout(paymentData) {
    try {
      setLoading(true);
      const url = `${baseUrl}/api/checkout`;
      const token = cookie.get("token");
      const headers = { headers: { Authorization: token } };
      await axios.post(url, paymentData, headers);
      setSuccess(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      Router.push("/");
    }
  }

  function getSum(array) {
    let sum = 0;
    array.map((el) => {
      sum = sum + el.product.price * el.quantity;
    });
    return sum;
  }

  return (
    <>
      <div className="cart-page">
        <div className="shopingcart">
          <div className="header">
            <h2>
              {Products.length === 0
                ? "your shoping cart is empty"
                : "Shoping Cart"}
            </h2>
          </div>
          {Products.length !== 0 && (
            <div className="withCheckout">
              <div className="shopingcart-list">
                {Products.map((el, i) => {
                  return (
                    <div key={"div" + i} className="shopingcart-product">
                          <Link href={`/Product?_id=${el.product._id}`}>
                        <div className="image-con">
                          <img src={el.product.mediaUrl} />
                        </div>
                      </Link>
                      <div className="info-con">
                        <p className="name" key={"name" + i}>
                          {el.product.name}
                        </p>
                        <p key={"price" + i}>{el.product.price}</p>
                        <p key={"quantity" + i}>{el.quantity}</p>
                        <button
                          className="bttn-mini"
                          onClick={() => deleteProduct(el.product._id)}
                        >
                          <p className="x">x</p>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div id="StripeCheckout">
                <StripeCheckout
                  name="React Reserve"
                  amount={stripeAmount}
                  image={
                    Products.length > 0 ? Products[0].product.mediaUrl : ""
                  }
                  currency="EUR"
                  shippingAddress={true}
                  billingAddress={true}
                  zipCode={true}
                  stripeKey="pk_test_6GCyEv03yWinorBzeSbSOQdd00QbRDOSFR"
                  token={handleCheckout}
                  triggerEvent="onClick"
                >
                  <button
                    className="bttn-second"
                    disabled={Products.length === 0}
                  >
                    <p>Checkout</p>
                  </button>
                </StripeCheckout>
                <div id="sum">
                  <p>{getSum(Products)}€</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

Cart.getInitialProps = async (ctx) => {
  console.log("Cart.getInitialProps");
  const { token } = parseCookies(ctx);
  if (token) {
    const url = `${baseUrl}/api/cart`;
    const res = await axios.get(url, { headers: { Authorization: token } });
    console.log(res.data);

    return { products: res.data };
  }
};

export default Cart;
