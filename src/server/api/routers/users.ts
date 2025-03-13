import { eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { users } from "~/server/db/schema";
import { z } from "zod";

type usersReturn = {
  type: "success" | "error",
  message?: string
}

export const usersRouter = createTRPCRouter({
  checkNewUser: protectedProcedure
    .query(async ({ ctx }) => {
      const user = await ctx.db.query.users.findFirst({
        where: eq(users.id, ctx.session.user.id)
      });

      if(!user) {
        throw new Error('No user associated with this account')
      }

      if(!user.username) {
        return true;
      }
      return false;
    }),

  setUsername: protectedProcedure
    .input(z.object({
      username: z.string().min(1)
    }))
    .mutation(async ({ ctx, input }): Promise<usersReturn> => {
      const usernameExists = await ctx.db.query.users.findFirst({ where: eq(users.username, input.username) });
      if(!usernameExists) {
        await ctx.db.update(users).set({ username: input.username }).where(eq(users.id, ctx.session.user.id));
        return { type: "success", message: undefined }
      } else {
        return { type: "error", message: "Username already exists" }
      }
    })
})