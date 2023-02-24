import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";

export const smoothiesRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    const items = await prisma.smoothie.findMany();
    return items;
  }),
  deleteOne: publicProcedure
    .input(z.number())
    .mutation(async ({ input: id }) => {
      await prisma.smoothie.delete({ where: { id } });
      return {};
    }),
});
