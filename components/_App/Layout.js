import Head from "next/head";
// import Header from "./Header";
import Menu from "./Menu";
import "../../public/static/_styles.scss";

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
          href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
          rel="stylesheet"
        ></link>
        <link
          rel="stylesheet"
          type="text/scss"
          href="/static/_styles.scss"
          key="global"
        />
        <title>ReactReserve</title>
      </Head>
      <div>
        <header>
          <Menu {...props} />
        </header>
        <div id="core">{props.children}</div>
      </div>
    </>
  );
}

export default Layout;
