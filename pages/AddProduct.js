import React, { useState } from "react";
import fetch from "node-fetch";
import baseUrl from "../u/baseUrl.js";

const INITIAL_PRODUCT = {
  name: "",
  price: "",
  media: "",
  description: "",
};

function AddProduct() {
  // const [product, setProduct] = React.useState(INITIAL_PRODUCT);
  // const { name, price, description, media } = product;
  const [mediaPreview, setMediaPreview] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [errMsg, setErrMsg] = React.useState("");

  function handleChange(event) {
    const { name, value, files } = event.target;
    if (name === "media") {
      if (files.length) {
        // if nothig is selected
        setMediaPreview(window.URL.createObjectURL(files[0]));
        // setProduct((prevState) => ({ ...prevState, media: files[0] }));
      }
    }
    // else {
    //   setProduct((prevState) => ({ ...prevState, [name]: value }));
    // }
  }

  async function handleImageUpload(_id) {
    const fromData = new FormData();
    fromData.append("productImage", document.getElementById("media").files[0]);

    // fromData.append("productImage", product.media);
    fromData.append("_id", _id);

    const url = `${baseUrl}/api/sharp?_id=${_id}`;

    const res_sharp = await fetch(url, {
      method: "POST",
      body: fromData,
    });
    const res_sharp_json = await res_sharp.json();
    return res_sharp_json;
  }

  function getFormInputList() {
    const children = document.getElementById("product-form").children;
    const inputList = [];
    for (let i = 0; i < children.length; i++) {
      const tag = children[i].tagName;
      if (tag === "INPUT") {
        console.log(children[i]);
        inputList.push(children[i].id);
      }
      console.log(inputList);
    }
    return inputList;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setErrMsg("");
    const url = `${baseUrl}/api/product`;
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;

    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ product: { name, price } }),
    });
    const data = await res.json();

    const res2 = await handleImageUpload(data._id);
    console.log(res2);

    let inputList = getFormInputList();

    setLoading(false);
    // setProduct(INITIAL_PRODUCT);
    if (data.hasOwnProperty("errorMsg")) {
      setErrMsg(data.errorMsg);
    } else {
      console.log("SUCCESS");
      // document.getElementById("product-form").reset();
      inputList.forEach((id) => (document.getElementById(id).value = null));

      setMediaPreview("");
      setSuccess(true);
    }
  }

  return (
    <div>
      {errMsg}
      {loading ? "loading" : ""}
      <form id="product-form">
        <input
          id="name"
          type="text"
          name="name"
          label="Name"
          placeholder="Name"
          // value={name}
          onChange={handleChange}
        />
        <input
          id="price"
          type="number"
          name="price"
          label="Price  "
          placeholder="price"
          // value={price}
          onChange={handleChange}
        />
        <input
          id="media"
          type="file"
          name="media"
          accept="image/*"
          content="Select Image"
          onChange={handleChange}
        />
        <img src={mediaPreview}></img>
        <button type="submit" disabled={loading} onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
