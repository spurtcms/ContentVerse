
import CustomProviders from "@/StoreConfiguration/CustomProviders";
import "@/styles/globals.css";
import NextTopLoader from "nextjs-toploader";

export default function App({ Component, pageProps }) {
  return (
    <>
      <NextTopLoader
        color="#2299DD"
        initialPosition={0.08}
        crawlSpeed={200}
        height={4}
        crawl={true}
        showSpinner={false}
        easing="ease"
        speed={200}
        shadow="0 0 10px #2299DD,0 0 5px #2299DD"
        //       template='<div className="bar" role="bar"><div className="peg"></div></div> 
        // <div className="spinner" role="spinner"><div className="spinner-icon"></div></div>'
        zIndex={1600}
        showAtBottom={false}
      />

      <CustomProviders>
        <Component {...pageProps} />
      </CustomProviders>
    </>


  );
}


