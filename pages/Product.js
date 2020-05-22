const { useRouter } = require("next/router");
import fetch from "node-fetch";
import cookie from "js-cookie";
//my
import baseUrl from "../u/baseUrl";


function Product(props) {
  console.log("PRODUCT PROPS",props);
  const { name, price, description, mediaUrl, _id } = props.product;
  const [chosenProduct, setchosenProduct] = React.useState({
    quantity: 1,
  });

  const router = useRouter();

  function handleChange(event) {
    const { name, value } = event.target;
    setchosenProduct({ ...chosenProduct, [name]: value });
  }

  const delelteProduct = async () => {
    const url = baseUrl + "/api/product?_id=" + _id;
    await fetch(url, {
      method: "DELETE",
    });
    router.push("/");
  };

  const addToCart = async (event) => {
    event.preventDefault();
    const quantity = document.getElementById("quantity").value;
    console.log("quantity "+quantity);
    // product ID
    const token = cookie.get("token");
    console.log(token)
    const url = baseUrl + "/api/cart";

    const res = await fetch( url, {
      method: "PUT",
      body: JSON.stringify({ product: { ...chosenProduct, productId: _id } }),
      headers: { Authorization: token },
    });
    // console.log(res.json())
    const data = await res.json();
    console.log(data);
    // router.push("/");
  };

  return (
    <>
      <h1>{name}</h1>
      <p>PRICE:{price}</p>
      <p>{description}</p>
      <img src={mediaUrl} />
      {props.user && props.user.role === "user" && (
        <>
          <form>
            <input
              id="quantity"
              type="number"
              name="quantity"
              label="quantity"
              value={chosenProduct.quantity}
              min="1"
              onChange={handleChange}
            />
          </form>
          <button onClick={addToCart}>add to cart</button>
        </>
      )}
      {props.user && props.user.role === "admin" && (
        <>
          <p>{_id}</p>
          <button onClick={delelteProduct}>X</button>{" "}
        </>
      )}
    </>
  );
}

Product.getInitialProps = async ({ query: { _id } }) => {
  const url = baseUrl + "/api/product?_id=" + _id;
  const res = await fetch(url, {
    method: "GET",
  });
  const data = await res.json();
  console.log(data);
  return { product: data };
  // return response data as an object
  // note: this object will be merged with existing props
};

export default Product;
