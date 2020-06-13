import Link from "next/link";
import { useRouter } from "next/router";
import "../../public/static/c/_bttn-menu.scss";

export default function MenuLinkLogged(props) {
  const { pathname } = useRouter();
  const path = `/${props.link}`;
  let classes = "bttn-menu underline";

  const isActive = (path) => {
    if (path === pathname) {
      classes = classes + " " + "isActive";
    }
  };
  isActive(path);

  return (
    <>
      {props.logged && (
        <Link href={`/${props.link}`}>
          <button onClick={(e)=> console.log(props.link)} className={classes}>
            {props.title || props.link}
          </button>
        </Link>
      )}
    </>
  );
}
