import { eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { users } from "~/server/db/schema";

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
    })
})