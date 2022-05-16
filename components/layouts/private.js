import LoggedIn from "../../firebase/loggedIn";
import PrivateHeader from "../common/admin/header";
import PublicFooter from "../common/footer";

export default function PrivateLayout({ children }) {
  return (
    <LoggedIn>
      <PrivateHeader />
      <main className="private">
        {children}
      </main>
      <PublicFooter />
    </LoggedIn>
  );
}