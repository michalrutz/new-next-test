import "../public/static/_product.scss";
const { useRouter } = require("next/router");
import Link from "next/link";
import fetch from "node-fetch";
import cookie from "js-cookie";
//my
import baseUrl from "../u/baseUrl";

function Product(props) {
  console.log("PRODUCT PROPS", props);
  const [loading, setLoading] = React.useState(false);
  const [adding, setAdding] = React.useState("Add to Cart");

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
    setLoading(true);
    // setAdding("adding to Cart")
    const quantity = document.getElementById("quantity").value;
    console.log("quantity " + quantity);
    // product ID
    const token = cookie.get("token");
    console.log(token);
    const url = baseUrl + "/api/cart";

    const res = await fetch(url, {
      method: "PUT",
      body: JSON.stringify({ product: { ...chosenProduct, productId: _id } }),
      headers: { Authorization: token },
    });
    // console.log(res.json())
    const data = await res.json();
    console.log(data);
    setAdding("added to Cart");
    setTimeout(() => {
      setAdding("add to Cart");
    }, 2000);
    setLoading(false);

    // router.push("/");
  };

  return (
    <>
      <div className="product-page">
        <div className="product">
          <div className="product-image">
            <img src={mediaUrl} />
          </div>
          <div className="product-info">
            <h2>{name}</h2>
            <p>{price}€</p>
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

                <button className="bttn-second" onClick={addToCart}>
                  {adding}
                </button>
              </>
            )}
            {!props.user && (
              <>
                <Link href={`/Login`}>
                  <button className="bttn-second">login to buy</button>
                </Link>
              </>
            )}
            <p>
              description:{description} There are many variations of passages of
              Lorem Ipsum available, but the majority have suffered alteration
              in some form, by injected humour, or randomised words which don't
              look even slightly believable. If you are going to use a passage
              of Lorem Ipsum, you need to be sure there isn't anything
              embarrassing hidden in the middle of text.
            </p>

            {props.user && props.user.role === "admin" && (
              <>
                <p>{_id}</p>
                <button onClick={delelteProduct}>X</button>{" "}
              </>
            )}
          </div>
        </div>
      </div>
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
