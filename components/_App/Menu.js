import { useRouter } from "next/router";
import MenuLinkLogged from "./MenuLinkLogged";
import Logout from "./Logout";

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
      <nav>
        <div className="container">
          <div className="box logo" id="shop"><p>Shop Logo</p></div>
        </div>
        <div className="menu container">
          <MenuLinkLogged link="" title="home" logged={true} />
          <MenuLinkLogged link="Cart" logged={logged} />
          <Logout logged={logged} />
          <MenuLinkLogged link="Login" logged={!logged} />
          <MenuLinkLogged link="Signup" logged={!logged} />

          {props.user && props.user.role === "admin" && (
            <MenuLinkLogged
              link="Create"
              title="create"
              logged={logged}
            />
          )}
        </div>
      </nav>
    </>
  );
}
