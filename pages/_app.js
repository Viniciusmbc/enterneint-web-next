import "../styles/globals.css";

import { AuthContextProvider } from "../context/AuthContext";

export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}
