// Styles
import "../styles/globals.css";

// Context
import { AuthContextProvider } from "../context/AuthContext";

// Components
import ProtectedRoute from "../components/ProtectedRoute";

// Router
import { useRouter } from "next/router";

const noAuthRequired = ["/", "/login", "/signup", "/movies", "/tvseries"];

export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  const router = useRouter();

  return getLayout(
    <AuthContextProvider>
      {noAuthRequired.includes(router.pathname) ? (
        <Component {...pageProps} />
      ) : (
        <ProtectedRoute>
          <Component {...pageProps} />
        </ProtectedRoute>
      )}
    </AuthContextProvider>
  );
}
