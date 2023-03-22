import type Prisma from "@prisma/client";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { formatDate } from "~/utils/dates/formatDate";
import { SmoothieForm } from "../editSmoothieForm/editSmoothieForm";
import { api } from "~/utils/api";
type SmoothieProps = Prisma.smoothies;

export const Smoothie = ({ smoothie }: { smoothie: SmoothieProps }) => {
  const queryClient = useQueryClient();
  const deleteSmoothie = api.smoothies.deleteOne.useMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries();
    },
  });
  const [editing, setEditing] = useState(false);
  const { title, created_at, method, rating, id } = smoothie;
  const showForm = () => {
    setEditing(true);
  };
  const handleEditing = () => {
    setEditing(false);
  };
  return (
    <>
      {!editing ? (
        <div className="mb-5 w-full max-w-lg rounded-lg bg-neutral-50 p-5 shadow-lg">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">{title}</h2>
            <div className="flex">
              <button
                onClick={showForm}
                className="rounded-lg bg-gray-200 px-3 py-2 font-semibold text-gray-700 hover:bg-gray-300"
              >
                Edit
              </button>
              <button
                //deploy
                onClick={() => deleteSmoothie.mutate({ smoothieId: id })}
                className="ml-2 rounded-lg bg-red px-3 py-2 font-semibold text-white hover:bg-red-300"
              >
                Delete
              </button>
            </div>
          </div>
          <div className="mb-3 text-gray-600">{formatDate(created_at)}</div>
          <p className="text-lg">{method}</p>
          <div className="mt-3">
            <span className="text-gray-600">Rating: </span>
            <span className="text-lg font-semibold">{rating}</span>
          </div>
        </div>
      ) : (
        <SmoothieForm handleEditing={handleEditing} {...smoothie} />
      )}
    </>
  );
};
