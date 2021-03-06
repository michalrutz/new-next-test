import React from "react";
import Router from "next/router";
import Link from "next/link";
import "../public/static/_form.scss";

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
    setError("");
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
        setError("password is required");
        throw AppError("password is required");
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
          // Router.push("/");
          Router.reload(window.location.pathname);
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
      <div className="form_container">
        {loading && <div id="loading">loading</div>}
        {error && <div id="error">{error}</div>}

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
          <div className="note-con">
            <Link href="/Signup">
              <p>don't have an account? sign up now</p>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
