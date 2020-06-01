import Link from "next/link";
import { useRouter } from "next/router";

export default function MenuLinkLogged(props) {
  const { pathname } = useRouter();
  const path = `/${props.link}`;
  let classes = "bttn underline";

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
          <button onClick={props.fun} className={classes}>
            {props.title || props.link}
          </button>
        </Link>
      )}
    </>
  );
}
