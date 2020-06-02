import Link from "next/link";
import { useRouter } from "next/router";
import cookie from "js-cookie";

export default function Logout(props) {
  return (
    <>
      {props.logged && (
        <Link href={`/Login`}>
          <button className="bttn underline" onClick={() => cookie.remove("token")}>
            logout
          </button>
        </Link>
      )}
    </>
  );
}
