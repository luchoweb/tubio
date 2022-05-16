import LoggedIn from "../../firebase/loggedIn";

export default function PrivateLayout({ children }) {
  return (
    <LoggedIn>
      <main className="private">
        {children}
      </main>
    </LoggedIn>
  );
}