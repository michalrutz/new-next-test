import "../../public/static/header.scss";
import { useRouter } from "next/router";
import MenuLinkLogged from "./MenuLinkLogged";
import Logout from "./Logout";

function toggleVisibility(id, c) {
  var x = document.getElementById(id);
  if (x.style.display === "none") {
    x.style.display = "flex";
  } else {
    x.style.display = "none";
  }
}

function toggleStyle(id, c) {
  var x = document.getElementById(id);
  x.classList.toggle(c);
  console.log(x);
}

export default function Menu(props) {
  const { pathname } = useRouter();

  let logged;
  let admin;
  if (props.user) {
    console.log(props.user);
    logged = true;
  } else logged = false;

  const isActive = (path) => {
    return path === pathname;
  };

  return (
    <>
      <button
        className="container con-hamburger"
        id="hamburger"
        onClick={() => {
          toggleVisibility("menu-pop");
          toggleStyle("hamburger", "hamburger-x");
        }}
      >
        <div id="bars-back"></div>
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </button>
      <nav>
        <div className="container logo-con">
          <div className="box logo" id="logo">
            <p>Shop Logo</p>
          </div>
        </div>

        <div className="container menu">
          <MenuLinkLogged link="" title="home" logged={true} />
          <MenuLinkLogged link="Cart" logged={logged} />
          <Logout logged={logged} />
          <MenuLinkLogged link="Login" logged={!logged} />
          <MenuLinkLogged link="Signup" logged={!logged} />

          {props.user && props.user.role === "admin" && (
            <MenuLinkLogged link="Create" title="create" logged={logged} />
          )}
        </div>
      </nav>
      <div
        id="menu-pop"
        className="hidden-menu menu"
        style={{ display: "none" }}
      >
        <MenuLinkLogged link="" title="home" logged={true} />
        <MenuLinkLogged link="Cart" logged={logged} />
        <Logout logged={logged} />
        <MenuLinkLogged link="Login" logged={!logged} />
        <MenuLinkLogged link="Signup" logged={!logged} />

        {props.user && props.user.role === "admin" && (
          <MenuLinkLogged link="Create" title="create" logged={logged} />
        )}
      </div>
    </>
  );
}
