import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Navigation from "~/components/Navigation";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className="bg-gradient-to-b from-[#915dda] to-[#4850d8]">
      <Navigation />
      <Component {...pageProps} />
      <ReactQueryDevtools />
    </main>
  );
};

export default api.withTRPC(MyApp);
