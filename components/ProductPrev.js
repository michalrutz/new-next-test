import Link from "next/link";
import baseUrl from '../u/baseUrl'

function ProduktCard({ item }) {
  const { _id, name, price, description, image } = item;
  if (image) {
    console.log(image.data);
  }
  return (
    <>
      <div key={_id}>
        <p>{name}</p>
        <p>{price}</p>
        <Link key={_id + "Link"} href={"/product?_id=" + _id}>
          <a className="link">
          <img src={"/img/products/productImage-" + _id + ".jpeg"} />
          </a>
        </Link>
      </div>
    </>
  );
}

export default ProduktCard;
