import App from "next/app";
// import Layout from "../components/_App/Layout";
import fetch from "node-fetch";
import { parseCookies } from "nookies";
import chalk from "chalk";
//my
import redirectUser from "../u/redirect";
import baseUrl from "../u/baseUrl";

export function isAuthorized(
  user = { role: "user" },
  path = "",
  role = "admin",
  restrictedRoutes = [""]
) {
  if (user.role !== role) {
    const isRestrictedRoute = restrictedRoutes.some((el) => path === el);
    if (isRestrictedRoute) {
      return false;
    } else return true;
  }
  return true;
}

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    console.log("APP START");

    const { token } = parseCookies(ctx);
    console.log(chalk.magenta(token ? "got token from cookies" : "no token"));
    let pageProps = {};

    // call the method getInitialProps for the Component with ctx from _app
    // save the results as props and send it to the Component
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    if (!token) {
      // CHECK IF PROTECTED
      const protectedRoutes = ["/account", "/cart", "/addProduct"];
      const isProtectedRoute = protectedRoutes.some(
        (el) => ctx.pathname === el
      ); // -> ctx.pathname === "/account" ||
      if (isProtectedRoute) {
        redirectUser(ctx, "/login");
      }
    } else {
      // LOGGED
      try {
        console.log("LOGGED");
        const url = `${baseUrl}/api/a`;
        const res = await fetch(url, {
          method: "GET",
          headers: { Authorization: token },
        });
        const data = await res.json();
        const { user } = data;
        // AUTHORIZED
        const restrictedRoutes = ["/addProduct"];
        const authorized = isAuthorized(
          user,
          ctx.pathname,
          "admin",
          restrictedRoutes
        );
        if (!authorized) {
          redirectUser(ctx, "/");
        }
        pageProps.user = user;
      } catch (error) {
        console.error("Error getting current user", error);
      }
    }

    return { pageProps };
  }

  render() {
    // send the pageProps as props
    const { Component, pageProps } = this.props;
    return (
      <div>
        {pageProps.user && pageProps.user.name}
        <Component {...pageProps} />{" "}
      </div>
    );
  }
}

export default MyApp;
