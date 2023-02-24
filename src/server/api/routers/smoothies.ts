import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";
export const FormSchema = z.object({
  title: z.string().min(5).max(150),
  method: z.string().min(5).max(5000),
  rating: z.number().min(1).max(10),
});
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
  addOne: publicProcedure.input(FormSchema).mutation(async (input) => {
    await prisma.smoothie.create({
      data: input,
    });
    return {};
  }),
});
