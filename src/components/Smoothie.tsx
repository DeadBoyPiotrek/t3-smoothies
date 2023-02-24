import type Prisma from "@prisma/client";
import { api } from "~/utils/api";
import { formatDate } from "~/utils/helpers";

type SmoothieProps = Prisma.Smoothie;

export const Smoothie = (smoothie: SmoothieProps) => {
  const deleteSmoothie = api.smoothies.deleteOne.useMutation();
  const { title, created_at, method, rating, id } = smoothie;
  return (
    <div className="mb-5 w-full max-w-lg rounded-lg bg-white p-5 shadow-lg">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <div className="flex">
          <button
            onClick={() => deleteSmoothie.mutate(id)}
            className="mr-2 rounded-lg bg-red-400 px-3 py-2 font-semibold text-white hover:bg-red-300"
          >
            Delete
          </button>
          <button className="rounded-lg bg-gray-200 px-3 py-2 font-semibold text-gray-700 hover:bg-gray-300">
            Edit
          </button>
        </div>
      </div>
      <div className="mb-3 text-gray-600">{formatDate(created_at)}</div>
      <p className="break-all text-lg">{method}</p>
      <div className="mt-3">
        <span className="text-gray-600">Rating: </span>
        <span className="text-lg font-semibold">{rating}</span>
      </div>
    </div>
  );
};
