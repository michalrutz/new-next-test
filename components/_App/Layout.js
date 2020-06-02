import Head from "next/head";
// import Header from "./Header";
import Menu from "./Menu";
import "../../public/static/styles.scss";

// import NProgress from "nprogress";
// import Router from "next/router";

// Router.onRouteChangeStart = () => NProgress.start();
// Router.onRouteChangeComplete = () => NProgress.done();
// Router.onRouteChangeError = () => NProgress.done();

function Layout(props) {
  return (
    <>
      <Head>
        {/* Stylesheets */}
        <link
          href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Abel&display=swap"
          rel="stylesheet"
        ></link>
        <link
          rel="stylesheet"
          type="text/scss"
          href="/static/styles.scss"
          key="global"
        />
        <title>ReactReserve</title>
      </Head>
      <header>
        <Menu {...props} />
      </header>
      {props.children}
    </>
  );
}

export default Layout;
