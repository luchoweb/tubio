import LoggedIn from "../../firebase/loggedIn";
import PrivateHeader from "../common/admin/header";
import PublicFooter from "../common/footer";

export default function PrivateLayout({ children }) {
  return (
    <LoggedIn>
      <PrivateHeader />
      <main className="private bg-light pt-5 pb-5">
        {children}
      </main>
      <PublicFooter />
    </LoggedIn>
  );
}