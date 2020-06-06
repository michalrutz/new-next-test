import React from "react";
import Router from "next/router";
import "../public/static/form.scss";

import cookie from "js-cookie";
import fetch from "node-fetch";

import baseUrl from "../u/baseUrl";
import AppError from "../u/AppError";

const INITIAL_USER = {
  email: "",
  password: "",
};

function Login() {
  const [user, setUser] = React.useState(INITIAL_USER);
  const [disabled, setDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const isUser = Object.values(user).every((el) => Boolean(el));
    isUser ? setDisabled(false) : setDisabled(true);
  }, [user]);

  function handleChange(event) {
    const { name, value } = event.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      if (!user.email) {
        setError("email is required");
        throw AppError("email is required");
      }
      if (!user.password) {
        setError("email is password");
        throw AppError("email is password");
      }

      const url = `${baseUrl}/api/login`;
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ ...user }),
      });
      const data = await res.json();
      console.log(data);
      if (data) {
        if (data.errorMsg) {
          setError(data.errorMsg);
        } else {
          cookie.set("token", data.token);
          Router.push("/");
        }
      }
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {loading ? "loading" : ""}
      {error}
      <div className="form_container">
        <form className="form">
          <h1>Login</h1>
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
            login
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
