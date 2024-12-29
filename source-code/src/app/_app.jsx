import { useRouter } from "next/navigation";
import { usePathname, useSearchParams } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import "antd/dist/antd.css"; // Import Ant Design styles globally
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // useEffect(() => {
  //   const handleStart = () =>{
  //     console.log("start");
  //     setLoading(true)};
  //   const handleComplete = () => setLoading(false);
  //   // console.log("router", );
  //   router.events.on("routeChangeStart", handleStart);
  //   router.events.on("routeChangeComplete", handleComplete);
  //   router.events.on("routeChangeError", handleComplete);

  //   return () => {
  //     router.events.off("routeChangeStart", handleStart);
  //     router.events.off("routeChangeComplete", handleComplete);
  //     router.events.off("routeChangeError", handleComplete);
  //   };
  // }, [router]);
  useEffect(() => {
    const handleStart = () => {
      console.log("Navigation start");
      setLoading(true);
    };
    const handleComplete = () => {
      console.log("Navigation complete");
      setLoading(false);
    };

    handleStart();
    handleComplete();

    return () => {
      handleComplete();
    };
  }, [pathname]);
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
