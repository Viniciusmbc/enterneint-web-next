// Styles
import "../styles/globals.css";

// Context
import { AuthProvider } from "../context/AuthContext";

// Router
import { useRouter } from "next/router";

const noAuthRequired = [
  "/",
  "/login",
  "/signup",
  "/movies",
  "/tvseries",
  "/bookmarked",
];

export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  const router = useRouter();

  return getLayout(
    <AuthProvider>
        <Component {...pageProps} />
    </AuthProvider>
  );
}
