import React from "react";
import Link from "next/link";
import fetch from "node-fetch";
// import catchErrors from "../u/catchErrors";
import baseUrl from "../u/baseUrl";
import cookie from "js-cookie";
import Router from "next/router";

import "../public/static/_form.scss";

const INITIAL_USER = {
  name: "",
  email: "",
  password: "",
};

function Signup() {
  const [user, setUser] = React.useState(INITIAL_USER);
  //   const [disabled, setDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    // const isUser = Object.values(user).every((el) => Boolean(el));
    // isUser ? setDisabled(false) : setDisabled(true);
  }, [user]);

  function handleChange(event) {
    const { name, value } = event.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setError("");
    console.log(event);
    console.log(user);
    const url = `${baseUrl}/api/signup`;

    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ ...user }),
    });
    console.log(res);
    const data = await res.json();
    console.log("DATA", data);
    if (data) {
      if (data.errorMsg) {
        console.log(data.errorMsg);
        setError(data.errorMsg);
      } else if (data.token) {
        cookie.set("token", data.token);
        Router.push("/");
      }
    }
    setLoading(false);
  }

  return (
    <>
      <div className="form_container">
        {error && <div id="error">{error}</div>}
        {loading && <div id="loading">loading</div>}
        <form className="form">
          <h1>Sign Up</h1>
          <input
            name="name"
            type="text"
            label="name"
            placeholder="name"
            onChange={handleChange}
          />
          <input
            name="email"
            type="email"
            label="email"
            placeholder="email"
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            label="password"
            placeholder="password"
            onChange={handleChange}
          />
          <button className="bttn-second" id="submit" onClick={handleSubmit}>
            sign up
          </button>
        </form>
      </div>
    </>
  );
}

export default Signup;
