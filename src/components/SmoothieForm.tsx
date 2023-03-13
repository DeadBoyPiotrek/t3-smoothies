import { useForm, type SubmitHandler } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import type Prisma from "@prisma/client";
const FormSchema = z.object({
  title: z.string().min(5).max(150),
  method: z.string().min(5).max(5000),
  rating: z.number().min(1).max(10),
  id: z.number(),
});
import { api } from "~/utils/api";
import { formatDate } from "~/utils/helpers";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
export type FormSchemaType = z.infer<typeof FormSchema>;
type SmoothieItem = Prisma.Smoothie;
type OnRefetch = { onRefetch: () => void };
type HandleEditing = { handleEditing: () => void };
type SmoothieProps = SmoothieItem & OnRefetch & HandleEditing;
export const SmoothieForm = ({
  onRefetch,
  handleEditing,
  ...smoothie
}: SmoothieProps) => {
  const { title, created_at, method, rating, id } = smoothie;
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });
  const [val, setVal] = useState("");
  const { ref } = register("method");

  const resizeTextArea = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  useEffect(resizeTextArea, [val]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
  };

  const updateSmoothie = api.smoothies.updateOne.useMutation({
    onSuccess: () => {
      onRefetch();
    },
  });

  function useOutsideAlerter(ref: React.RefObject<HTMLElement>) {
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          void handleSubmit(onSubmit)();
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  const wrapperRef = useRef(null);

  useOutsideAlerter(wrapperRef);

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    //deploy
    // updateSmoothie.mutate({ ...data });
    handleEditing();
  };

  const deleteSmoothie = api.smoothies.deleteOne.useMutation({
    onSuccess: () => {
      void onRefetch();
    },
  });

  return (
    <form
      //TODO
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onSubmit)}
      ref={wrapperRef}
      noValidate
      className="mb-5 w-full max-w-lg rounded-lg bg-white p-5 shadow-lg"
    >
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">
          <input
            defaultValue={title}
            type="text"
            id="title"
            {...register("title")}
            className="focus:shadow-outline h-auto w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
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
            type="submit"
            className="ml-2 rounded-lg bg-gray-200 px-3 py-2 font-semibold text-gray-700 hover:bg-gray-300"
          >
            Submit
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              //deploy
              //   deleteSmoothie.mutate(id);
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
          defaultValue={method}
          id="method"
          {...register("method", {
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              onChange(e);
            },
          })}
          ref={(e) => {
            ref(e);
            textAreaRef.current = e;
          }}
          className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none "
          disabled={isSubmitting}
        />

        {errors.method && (
          <p className="text-xs italic text-red-500">{errors.method.message}</p>
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

      <input
        type={"hidden"}
        {...register("id", { valueAsNumber: true })}
        defaultValue={id}
        id="id"
      />
    </form>
  );
};
