import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";
const FormSchema = z.object({
  title: z.string().min(5).max(150),
  method: z.string().min(5).max(5000),
  rating: z.number().min(1).max(10),
});
const FormSchemaEdit = FormSchema.extend({ id: z.number() });
export const smoothiesRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    const items = await prisma.smoothie.findMany({
      orderBy: { created_at: "desc" },
    });
    return items;
  }),
  getAllFiltered: publicProcedure
    .input(z.string().max(150))
    .query(async ({ input }) => {
      const items = await prisma.smoothie.findMany({
        where: { title: { contains: input } },
        orderBy: { created_at: "desc" },
      });
      return items;
    }),
  deleteOne: publicProcedure
    .input(z.number())
    .mutation(async ({ input: id }) => {
      await prisma.smoothie.delete({ where: { id } });
      return {};
    }),
  deleteAll: publicProcedure.mutation(async () => {
    await prisma.smoothie.deleteMany();
    return {};
  }),
  addOne: publicProcedure.input(FormSchema).mutation(async ({ ctx, input }) => {
    await ctx.prisma.smoothie.create({
      data: input,
    });
    return {};
  }),
  addMany: publicProcedure
    .input(FormSchema.array())
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.smoothie.createMany({
        data: input,
      });
      return {};
    }),
  updateOne: publicProcedure
    .input(FormSchemaEdit)
    .mutation(async ({ ctx, input }) => {
      const { id, ...inputNoId } = input;
      await ctx.prisma.smoothie.update({
        where: { id },
        data: inputNoId,
      });
    }),
});
