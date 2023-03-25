import type { smoothies } from "@prisma/client";
import { Smoothie } from "~/components/smoothies/smoothie/Smoothie";
type SmoothieProps = {
  smoothiesFiltered: smoothies[] | undefined;
  loading: boolean;
};

export const Smoothies = ({ smoothiesFiltered, loading }: SmoothieProps) => {
  return (
    <div className=" flex w-full flex-wrap items-center justify-center gap-5 pt-28">
      {loading && (
        <p className="alert max-w-xs text-lg font-medium">
          Loading Smoothies...
        </p>
      )}
      {smoothiesFiltered &&
        smoothiesFiltered.map((smoothie) => (
          <Smoothie key={smoothie.id} smoothie={smoothie} />
        ))}
    </div>
  );
};
