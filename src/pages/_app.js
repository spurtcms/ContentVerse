
import CustomProviders from "@/StoreConfiguration/CustomProviders";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <CustomProviders>
      <Component {...pageProps} />
    </CustomProviders>
  );
}


