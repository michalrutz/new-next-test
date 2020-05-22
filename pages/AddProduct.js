import React, { useState } from "react";
import fetch from "node-fetch";
import baseUrl from "../u/baseUrl.js";
import axios from "axios";

import childrenTagList from "../u/childrenTagList";

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

  async function handleImageUpload() {
    if (!document.getElementById("media").files[0]) {
      setErrMsg("please upload an image");
    } else {
      const data = new FormData();
      data.append("file", document.getElementById("media").files[0]);
      data.append("upload_preset", "square_200px"); //face
      data.append("cloud_name", "dk5zucmo3");

      const res = await axios.post(process.env.CLOUDINARY_URL, data);
      const mediaUrl = res.data.url;
      console.log("mediaUrl", mediaUrl);

      return mediaUrl;
    }
    return null;
  }

  function getFormInputList(formId) {
    const children = document.getElementById(formId).children;
    const inputList = [];
    for (let i = 0; i < children.length; i++) {
      const tag = children[i].tagName;
      if (tag === "INPUT") {
        inputList.push(children[i].id);
      }
    }
    return inputList;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setErrMsg("");
    //upload the img and get the link

    //collect the data
    let url = `${baseUrl}/api/product`;
    let name = document.getElementById("name").value;
    let nameSimple = name.toLowerCase();
    let price = document.getElementById("price").value;
    if (!name || !price) {
      console.log("ERROR");
      setErrMsg("all fields are required");
      setLoading(false);
    } else {
      let mediaUrl = res2;
      const res2 = await handleImageUpload();
      //CREATE Product
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          product: { name, nameSimple, price, mediaUrl },
        }),
      });
      const data = await res.json();
      setLoading(false);
      // setProduct(INITIAL_PRODUCT);
      if (data.hasOwnProperty("errorMsg")) {
        setErrMsg(data.errorMsg);
      } else {
        console.log("SUCCESS");
        //RESET FORM
        let inputList = childrenTagList("product-form", "INPUT");
        inputList.forEach(
          (el) => (document.getElementById(el.id).value = null)
        );

        setMediaPreview("");
        setSuccess(true);
      }
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
