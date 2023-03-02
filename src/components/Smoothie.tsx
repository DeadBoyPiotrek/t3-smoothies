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

  const updateSmoothie = api.smoothies.updateOne.useMutation({
    onSuccess: () => {
      onRefetch();
    },
  });
  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    console.log(`🚀 ~ Smoothie ~ data:`, data);
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
        <form
          noValidate
          //TODO
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit(onSubmit)}
          // onBlur={void handleSubmit(onSubmit)}
          className="mb-5 w-full max-w-lg rounded-lg bg-white p-5 shadow-lg"
        >
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-semibold">
              <input
                defaultValue={title}
                type="text"
                id="title"
                {...register("title")}
                className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                disabled={isSubmitting}
              />
              {errors.title && (
                <p className="text-xs italic text-red-500">
                  {errors.title.message}
                </p>
              )}
            </h2>
            <div className="flex">
              <button
                onClick={() => deleteSmoothie.mutate(id)}
                className="mr-2 rounded-lg bg-red-400 px-3 py-2 font-semibold text-white hover:bg-red-300"
              >
                Delete
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  console.log("lol");

                  console.log("lol2");
                  setEditing(false);
                }}
                className="rounded-lg bg-gray-200 px-3 py-2 font-semibold text-gray-700 hover:bg-gray-300"
              >
                Edit
              </button>
            </div>
          </div>
          <div className="mb-3 text-gray-600">{formatDate(created_at)}</div>
          <p className="break-all text-lg">
            <textarea
              defaultValue={method}
              id="method"
              {...register("method")}
              className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              disabled={isSubmitting}
            />
            {errors.method && (
              <p className="text-xs italic text-red-500">
                {errors.method.message}
              </p>
            )}
          </p>
          <div className="mt-3">
            <span className="text-gray-600">Rating: </span>
            <span className="text-lg font-semibold">
              <input
                defaultValue={rating}
                type="number"
                id="rating"
                min={1}
                max={10}
                {...register("rating", { valueAsNumber: true })}
                className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                disabled={isSubmitting}
              />
              {errors.rating && (
                <p className="text-xs italic text-red-500">
                  {errors.rating.message}
                </p>
              )}
            </span>
          </div>
          <button
            type="submit"
            className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
            disabled={isSubmitting}
          >
            Submit
          </button>
          <input
            type={"hidden"}
            {...register("id", { valueAsNumber: true })}
            defaultValue={id}
            id="id"
          />
        </form>
      )}
    </>
  );
};
