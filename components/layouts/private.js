import LoggedIn from "../../firebase/loggedIn";
import PrivateHeader from "../common/admin/header";

export default function PrivateLayout({ children }) {
  return (
    <LoggedIn>
      <PrivateHeader />
      <main className="private">
        {children}
      </main>
    </LoggedIn>
  );
}