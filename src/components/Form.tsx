import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const FormSchema = z.object({
  title: z.string().min(5).max(150),
  method: z.string().min(5).max(5000),
  rating: z.number().min(1).max(10),
});
export type FormSchemaType = z.infer<typeof FormSchema>;

export const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<FormSchemaType>({ resolver: zodResolver(FormSchema) });

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    try {
      const response = await fetch("/api/addSmoothie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to add smoothie");
      }

      console.log("Smoothie added successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      noValidate
      //TODO
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onSubmit)}
      className="mb-4 w-[400px] rounded bg-white px-8 pt-6 pb-8 shadow-md"
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
        {errors.title && (
          <p className="text-xs italic text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="method" className="mb-2 block font-bold text-gray-700">
          Method:
        </label>
        <textarea
          id="method"
          {...register("method")}
          className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
          disabled={isSubmitting}
        />
        {errors.method && (
          <p className="text-xs italic text-red-500">{errors.method.message}</p>
        )}
      </div>

      <div className="mb-6">
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
        {errors.rating && (
          <p className="text-xs italic text-red-500">{errors.rating.message}</p>
        )}
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
          disabled={isSubmitting}
        >
          Submit
        </button>
      </div>
      <pre className="p-1">{JSON.stringify(watch(), null, 2)}</pre>
    </form>
  );
};
