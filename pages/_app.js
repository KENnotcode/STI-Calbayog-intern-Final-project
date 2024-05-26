import "@/styles/globals.css";
import useRouteChange from "@/components/hooks/useRouteChange";

export default function App({ Component, pageProps }) {
  useRouteChange();
  return <Component {...pageProps} />;
}
