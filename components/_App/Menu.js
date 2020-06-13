import "../../public/static/_header.scss";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import MenuLinkLogged from "./MenuLinkLogged";
import Logout from "./Logout";

export default function Menu(props) {
  const { pathname } = useRouter();

  useEffect(() => {
    var menu = document.getElementById("menu-mobile");
    var check = document.getElementById("check");

    window.onclick = function (event) {
      console.log(event.target == menu);

      if (event.target == menu) {
        check.checked = false;
      }
    };
  }, []);

  let logged;
  let admin;
  if (props.user) {
    console.log(props.user);
    logged = true;
  } else logged = false;

  const isActive = (path) => {
    return path === pathname;
  };
  // window.onclick = function (event) {
  //   if (event.target == menu) {
  //     menu.style.display = "none";
  //   }
  // };
  function close(e) {
    var menu = document.getElementById("menu-mobile");
    console.log(e.target);
  }

  return (
    <>
      <nav>
        <div id="check-con">
          <input id="check" type="checkbox" name="scales" />
          <div onClick={(e) => console.log("e.target")} id="bg"></div>
          <div id="menu-mobile">
            <MenuLinkLogged link="" title="home" logged={true} />
            <MenuLinkLogged link="Cart" logged={logged} />
            <Logout logged={logged} />
            <MenuLinkLogged link="Login" logged={!logged} />
            <MenuLinkLogged link="Signup" logged={!logged} />

            {props.user && props.user.role === "admin" && (
              <MenuLinkLogged link="Create" title="create" logged={logged} />
            )}
          </div>
          <button className="container" id="hamburger">
            <div id="bars-back"></div>
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </button>
        </div>

        <div className="container logo-con">
          <div id="logo" className="box logo" id="logo">
            <img src="img/LOGO.svg" />
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
      </nav>
    </>
  );
}
