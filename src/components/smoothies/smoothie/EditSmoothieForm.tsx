import type { Dispatch, SetStateAction } from "react";
import type Prisma from "@prisma/client";
type FormSchemaType = z.infer<typeof FormSchema>;
type SmoothieItem = Prisma.smoothies;
import { useForm, type SubmitHandler } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { api } from "~/utils/api";
import { formatDate } from "~/utils/dates/formatDate";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInputError } from "~/components/errors/FormInputError";
import { toast } from "react-toastify";

const FormSchema = z.object({
  title: z.string().min(5).max(150),
  method: z.string().min(5).max(5000),
  rating: z.number().min(1).max(10),
  id: z.number(),
});

interface SmoothieProps {
  setEditing: Dispatch<SetStateAction<boolean>>;
  smoothie: SmoothieItem;
}

export const EditSmoothieForm = ({ setEditing, smoothie }: SmoothieProps) => {
  const queryClient = useQueryClient();
  const updateSmoothie = api.smoothies.updateOneSmoothie.useMutation({
    onSuccess: async () => await queryClient.invalidateQueries(),
    onError: () => toast.error("Error updating smoothie"),
  });
  const deleteSmoothie = api.smoothies.deleteOneSmoothie.useMutation({
    onSuccess: async () => await queryClient.invalidateQueries(),
    onError: () => toast.error("Error deleting smoothie"),
  });

  const { created_at, id } = smoothie;
  const defaultValues = smoothie;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });
  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    //deploy
    // updateSmoothie.mutate(data);
    setEditing(false);
  };

  const [val, setVal] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const { ref: methodRef } = register("method");

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [val]);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
  };

  const wrapperRef = useRef(null);

  return (
    <form
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onSubmit)}
      ref={wrapperRef}
      noValidate
      className="mb-5 w-full max-w-lg rounded-lg bg-white p-5 shadow-lg"
    >
      <div className="mb-5 flex items-center justify-between">
        <div className="text-2xl font-semibold">
          <input
            type="text"
            id="title"
            {...register("title")}
            className="focus:shadow-outline h-auto w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            disabled={isSubmitting}
          />
          {errors.title?.message && (
            <FormInputError errorMessage={errors.title.message} />
          )}
        </div>
        <div className="flex">
          <button
            type="submit"
            className="ml-2 rounded-lg bg-gray-200 px-3 py-2 font-semibold text-gray-700 hover:bg-gray-300"
          >
            Submit
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              //deploy
              // deleteSmoothie.mutate({ smoothieId: id });
            }}
            className="ml-2 rounded-lg bg-red-400 px-3 py-2 font-semibold text-white hover:bg-red-300"
          >
            Delete
          </button>
        </div>
      </div>
      <div className="mb-3 text-gray-600">{formatDate(created_at)}</div>
      <p className="break-all text-lg">
        <textarea
          id="method"
          {...register("method", {
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              onChange(e);
            },
          })}
          ref={(e) => {
            methodRef(e);
            textAreaRef.current = e;
          }}
          className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none "
          disabled={isSubmitting}
        />

        {errors.method?.message && (
          <FormInputError errorMessage={errors.method.message} />
        )}
      </p>
      <div className="mt-3">
        <span className="text-gray-600">Rating: </span>
        <span className="text-lg font-semibold">
          <input
            type="number"
            id="rating"
            min={1}
            max={10}
            {...register("rating", { valueAsNumber: true })}
            className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            disabled={isSubmitting}
          />
          {errors.rating?.message && (
            <FormInputError errorMessage={errors.rating.message} />
          )}
        </span>
      </div>

      <input
        type={"hidden"}
        {...register("id", { valueAsNumber: true })}
        id="id"
      />
    </form>
  );
};
