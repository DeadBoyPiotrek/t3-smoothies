import { useState, useEffect } from "react";
import { useQueries } from "@tanstack/react-query";
import { api } from "~/utils/api";
export const SmoothieErrorModal = ({
  errorMessage,
}: {
  errorMessage: string;
}) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (true) {
      setShowModal(true);
      setTimeout(() => setShowModal(false), 15000);
    }
  }, [errorMessage]);

  return (
    <>
      {showModal && (
        <div className="fixed bottom-0 left-0 flex w-full items-end justify-end pr-16 pb-10 ">
          <div className="rounded-md bg-white px-4 py-3 font-bold text-red-500">
            <p>Error performing action ! </p>
            😓{errorMessage}😓
          </div>
        </div>
      )}
    </>
  );
};
