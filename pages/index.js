import React, { useState, useEffect } from "react";
import fetch from "node-fetch";
import Router, { useRouter } from "next/router";
import ProduktPrev from "../components/ProductPrev";
import baseUrl from "../u/baseUrl";
import chalk from "chalk";

function Home({ products }) {
  const [Products, setProducts] = React.useState(products);
  const [Loading, setLoading] = React.useState(false);
  const [Disable, setDisable] = React.useState(false);
  const [Order, setOrder] = React.useState("desc");
  const [Filter, setFilter] = React.useState("");

  const getSortedProducts = async (query) => {
    setLoading(true);
    setDisable(!Disable);
    setOrder(query);
    const url = `${baseUrl}/api/products?val=price&order=${query}&filter=${Filter}`;
    const res = await fetch(url, { method: "GET" });
    const data = await res.json();
    setProducts(data);
    setLoading(false);

    return data;
  };

  const handleChange = async (e) => {
    const val = e.target.value.toLowerCase();
    setFilter(val);
    const url = `${baseUrl}/api/products?val=price&order=${Order}&filter=${val}`;
    console.log(url);
    const res = await fetch(url, { method: "GET" });
    const data = await res.json();
    setProducts(data);
  };

  return (
    <>
      <div className="core">
        <div className="display_filter">
          <input
            id="filter"
            type="text"
            placeholder="search"
            onChange={(e) => handleChange(e)}
          />
          <button
            className="bttn underline"
            disabled={Disable}
            onClick={() => getSortedProducts("asc")}
          >
            ascending
          </button>

          <button
            className="bttn underline"
            disabled={!Disable}
            onClick={() => getSortedProducts("desc")}
          >
            descending
          </button>
          {Loading && <div className="message">loading</div>}
        </div>
        <div className="display_products">
          {Products.map((item) => (
            <ProduktPrev key={item._id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}

Home.getInitialProps = async () => {
  const url = `${baseUrl}/api/products?val=price&order=desc`;
  const res = await fetch(url, {
    method: "GET",
  });
  const data = await res.json();

  return { products: data };

  // return response data as an object
  // note: this object will be merged with existing props
};

export default Home;
