import "../public/static/shopingcart.scss";
import { parseCookies } from "nookies";
import Router from "next/router";
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

  return (
    <>
      <div className="cart-page">
        <div className="shopingcart">
          <div className="header">
            <h2>Shoping Cart</h2>
          </div>

          <div className="withCheckout">
            <div className="shopingcart-list">
              {Products.map((el, i) => {
                return (
                  <div key={"div" + i} className="shopingcart-product">
                    <div className="image-con">
                      <img src={el.product.mediaUrl} />
                    </div>
                    <div className="info-con">
                      <p className="name" key={"name" + i}>{el.product.name}</p>
                      <p key={"price" + i}>{el.product.price}</p>
                      <p key={"quantity" + i}>{el.quantity}</p>
                      {user.role === "admin" && (
                        <button className="bttn-second" onClick={() => deleteProduct(el.product._id)}>
                          X
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div id="StripeCheckout">
              <StripeCheckout
                name="React Reserve"
                amount={stripeAmount}
                image={Products.length > 0 ? Products[0].product.mediaUrl : ""}
                currency="EUR"
                shippingAddress={true}
                billingAddress={true}
                zipCode={true}
                stripeKey="pk_test_6GCyEv03yWinorBzeSbSOQdd00QbRDOSFR"
                token={handleCheckout}
                triggerEvent="onClick"
              >
                <button className="bttn-second" disabled={Products.length === 0}>
                  <p>Checkout</p>
                </button>
              </StripeCheckout>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Cart.getInitialProps = async (ctx) => {
  // const { token } = parseCookies(ctx);
  // const url = `${baseUrl}/api/cart`;
  const res = await axios.get(url, { headers: { Authorization: token } });
  console.log(res.data);

  return { products: res.data };
};

export default Cart;
