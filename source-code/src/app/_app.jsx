import { SessionProvider } from "next-auth/react";
import '../styles/globals.css';
import 'antd/dist/antd.css'; // Import Ant Design styles globally

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}