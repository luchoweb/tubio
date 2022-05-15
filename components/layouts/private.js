import { AuthUserProvider } from "../../firebase/authUserContext";

export default function PrivateLayout({ children }) {
  return (
    <AuthUserProvider>
      <main className="private">
        {children}
      </main>
    </AuthUserProvider>
  );
}