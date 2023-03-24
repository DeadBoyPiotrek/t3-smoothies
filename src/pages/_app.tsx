import "react-toastify/dist/ReactToastify.css";
import { type AppType } from "next/app";
import { api } from "~/utils/api";

import "~/styles/globals.css";
import { Navigation } from "~/components/navigation/Navigation";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
// import { SmoothieErrorModal } from "~/components/modals/errors/SmoothieErrorModal";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue to-blue-dark">
      {/* <SmoothieErrorModal errorMessage={"error lol"} /> */}
      <Navigation />
      <Component {...pageProps} />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="light"
      />
      <ReactQueryDevtools />
    </main>
  );
};

export default api.withTRPC(MyApp);
