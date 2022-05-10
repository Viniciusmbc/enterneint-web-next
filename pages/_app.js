import '../styles/globals.css'
import Navbar from '../components/Navbar'
import Layout from '../components/Layout'

export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(<Component {...pageProps} />)
}


