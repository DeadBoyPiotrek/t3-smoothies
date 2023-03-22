import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { Navigation } from "~/components/navigation/Navigation";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue to-blue-dark">
      <Navigation />
      <Component {...pageProps} />
      <ReactQueryDevtools />
    </main>
  );
};

export default api.withTRPC(MyApp);
