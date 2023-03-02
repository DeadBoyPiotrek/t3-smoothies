import type Prisma from "@prisma/client";
import { useState } from "react";
import { api } from "~/utils/api";
import { formatDate } from "~/utils/helpers";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
type SmoothieItem = Prisma.Smoothie;
type OnRefetch = { onRefetch: () => void };
type SmoothieProps = SmoothieItem & OnRefetch;

const FormSchema = z.object({
  title: z.string().min(5).max(150),
  method: z.string().min(5).max(5000),
  rating: z.number().min(1).max(10),
  id: z.number(),
});
export type FormSchemaType = z.infer<typeof FormSchema>;

export const Smoothie = ({ onRefetch, ...smoothie }: SmoothieProps) => {
  const [editing, setEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({ resolver: zodResolver(FormSchema) });

  const updateSmoothie = api.smoothies.updateOne.useMutation();
  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    updateSmoothie.mutate(data);
  };

  const deleteSmoothie = api.smoothies.deleteOne.useMutation({
    onSuccess: () => {
      void onRefetch();
    },
  });
  const { title, created_at, method, rating, id } = smoothie;
  return (
    <>
      {!editing ? (
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
              <button
                onClick={() => {
                  setEditing(true);
                }}
                className="rounded-lg bg-gray-200 px-3 py-2 font-semibold text-gray-700 hover:bg-gray-300"
              >
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
      ) : (
        // form
        <form className="mb-5 w-full max-w-lg rounded-lg bg-white p-5 shadow-lg">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">
              {<input {...register("title")} value={title} id=""></input>}
            </h2>
            <div className="flex">
              <button
                onClick={() => deleteSmoothie.mutate(id)}
                className="mr-2 rounded-lg bg-red-400 px-3 py-2 font-semibold text-white hover:bg-red-300"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  setEditing(false);
                  handleSubmit(onSubmit);
                }}
                className="rounded-lg bg-gray-200 px-3 py-2 font-semibold text-gray-700 hover:bg-gray-300"
              >
                Edit
              </button>
            </div>
          </div>
          <div className="mb-3 text-gray-600">{formatDate(created_at)}</div>
          <p className="break-all text-lg">
            {<input {...register("title")} placeholder={method} id=""></input>}
          </p>
          <div className="mt-3">
            <span className="text-gray-600">Rating: </span>
            <span className="text-lg font-semibold">
              {
                <input
                  {...(register("rating"), { valueAsNumber: true })}
                  value={`${rating}`}
                  id=""
                ></input>
              }
            </span>
          </div>
        </form>
      )}
    </>
  );
};
