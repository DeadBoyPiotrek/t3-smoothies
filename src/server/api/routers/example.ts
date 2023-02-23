import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { prisma } from "~/server/db";
import { Prisma } from "@prisma/client";

const defaultGreetingSelect = Prisma.validator<Prisma.GreetingSelect>()({
  text: true,
  id: true,
  created_at: true,
});
export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  supGreeting: publicProcedure.query(async () => {
    const items = await prisma.greeting.findMany({
      select: defaultGreetingSelect,
      where: {},
    });
    return {
      items,
    };
  }),
});
