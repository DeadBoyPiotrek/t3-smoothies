import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/utils/api";
import { FormInputError } from "../errors/FormInputError";
import { toast } from "react-toastify";

const FormSchema = z.object({
  title: z.string().min(5).max(150),
  method: z.string().min(5).max(5000),
  rating: z.number().min(1).max(10),
});
export type FormSchemaType = z.infer<typeof FormSchema>;

export const CreateSmoothieForm = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({ resolver: zodResolver(FormSchema) });

  const addSmoothie = api.smoothies.addOneSmoothie.useMutation({
    onError: () => toast.error("error creating smoothie"),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    //deploy
    addSmoothie.mutate(data);
    reset();
  };

  return (
    <form
      noValidate
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onSubmit)}
      className="mb-4 w-full max-w-md rounded bg-white px-8 pt-6 pb-8 shadow-md"
    >
      <div className="mb-4">
        <label htmlFor="title" className="mb-2 block font-bold text-gray-700">
          Title:
        </label>
        <input
          type="text"
          id="title"
          {...register("title")}
          className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
          disabled={isSubmitting}
        />
        {errors.title?.message && (
          <FormInputError errorMessage={errors.title.message} />
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="method" className="mb-2 block font-bold text-gray-700">
          Method:
        </label>
        <textarea
          id="method"
          {...register("method")}
          className="focus:shadow-outline h-52 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
          disabled={isSubmitting}
        />
        {errors.method?.message && (
          <FormInputError errorMessage={errors.method.message} />
        )}
      </div>

      <div className="mb-8">
        <label htmlFor="rating" className="mb-2 block font-bold text-gray-700">
          Rating:
        </label>
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
      </div>

      <button
        type="submit"
        className="focus:shadow-outline rounded bg-red py-2 px-4 font-bold text-white hover:bg-red-500 focus:outline-none"
        disabled={isSubmitting}
      >
        Submit
      </button>
    </form>
  );
};
