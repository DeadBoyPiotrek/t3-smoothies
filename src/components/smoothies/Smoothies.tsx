import type Prisma from "@prisma/client";
import { Smoothie } from "~/components/smoothies/Smoothie";
type SmoothieProps = Prisma.smoothies;
export const Smoothies = ({
  smoothiesFiltered,
}: {
  smoothiesFiltered: SmoothieProps[];
}) => {
  return (
    <div className=" flex flex-wrap items-center justify-center gap-5 pt-28">
      {smoothiesFiltered ? (
        smoothiesFiltered.map((smoothie) => (
          <Smoothie key={smoothie.id} smoothie={smoothie} />
        ))
      ) : (
        <div>no filtered smoothies found</div>
      )}
    </div>
  );
};
