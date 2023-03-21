import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";
import { FormSchema } from "./smoothieSchema";
const FormSchemaWithId = FormSchema.extend({ id: z.number() });
export const smoothiesRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    return await prisma.smoothies.findMany({
      orderBy: { created_at: "desc" },
    });
  }),
  getAllFiltered: publicProcedure
    .input(z.object({ smoothieTitle: z.string().max(150) }))
    .query(async ({ input }) => {
      return await prisma.smoothies.findMany({
        where: {
          title: { contains: input.smoothieTitle, mode: "insensitive" },
        },
        orderBy: { id: "desc" },
      });
    }),
  deleteOne: publicProcedure
    .input(z.object({ smoothieId: z.number() }))
    .mutation(async ({ input }) => {
      await prisma.smoothies.delete({ where: { id: input.smoothieId } });
    }),
  deleteAll: publicProcedure.mutation(async () => {
    await prisma.smoothies.deleteMany();
  }),
  addOne: publicProcedure.input(FormSchema).mutation(async ({ ctx, input }) => {
    await ctx.prisma.smoothies.create({
      data: input,
    });
  }),
  addMany: publicProcedure
    .input(FormSchema.array())
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.smoothies.createMany({
        data: input,
      });
    }),
  updateOne: publicProcedure
    .input(FormSchemaWithId)
    .mutation(async ({ ctx, input }) => {
      const { id, ...inputNoId } = input;
      await ctx.prisma.smoothies.update({
        where: { id },
        data: inputNoId,
      });
    }),
});
