import Link from "next/link";
import baseUrl from "../u/baseUrl";

function ProduktCard({ item }) {
  const { _id, name, price, description, image, mediaUrl } = item;

  return (
    <>
      <div key={_id} className="cart">
        <Link key={_id + "Link"} href={"Product?_id=" + _id}>
          <a className="cart_link">
            <img className="cart_img" src={mediaUrl} />
            <div className="cart_des">
            <p>{name}</p>
            <p>{price}€</p>
          </div>
          </a>
        </Link>
      
      </div>
    </>
  );
}

export default ProduktCard;


