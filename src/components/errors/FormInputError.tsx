export const FormInputError = ({ errorMessage }: { errorMessage: string }) => {
  return <p className="text-xs italic text-red-500">{errorMessage}</p>;
};
