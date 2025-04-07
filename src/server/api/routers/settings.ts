import { eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { users, userSettings } from "~/server/db/schema";
import { z } from "zod";
import type { APIResult } from "~/types";


type settingReturn<T> = {
  newSetting: T
}

type settings = {
  addTax: boolean,
  taxPercentageAsInt: number,
  addEmptyItemsToShoppingList: boolean,
  keepScreenOnWhileCooking: boolean,
  name: string | null,
  username: string | null,
}

export const settingsRouter = createTRPCRouter({
  getSettings: protectedProcedure
    .query(async ({ ctx }): Promise<APIResult<settings>> => {
      const userData = await ctx.db.query.users.findFirst({
        where: eq(users.id, ctx.session.user.id),
        with: {
          settings: true
        }
      });
      if(!userData) {
        return {
          error: { message: "There was an error loading the settings" },
          data: null
        }
      }
      return {
        data: {
          ...userData.settings,
          name: userData.name,
          username: userData.username 
        },
        error: null
      }
    }),

  setAddTax: protectedProcedure
    .input(z.object({
      value: z.boolean()
    }))
    .mutation(async ({ ctx, input }) => {
      const updateResult = await ctx.db
        .update(userSettings)
        .set({ addTax: input.value })
        .where(eq(userSettings.userId, ctx.session.user.id))
        .returning({ newSetting: userSettings.addTax });

      return CheckSetting(updateResult)
    }),

  setTaxPercentage: protectedProcedure
    .input(z.object({
      newTax: z.number()
    }))
    .mutation(async ({ ctx, input }) => {
      const updateResult = await ctx.db
        .update(userSettings)
        .set({ taxPercentageAsInt: input.newTax })
        .where(eq(userSettings.userId, ctx.session.user.id))
        .returning({ newSetting: userSettings.taxPercentageAsInt });
      return CheckSetting(updateResult)
    }),

  setAddEmptyItems: protectedProcedure
    .input(z.object({
      newSetting: z.boolean()
    }))
    .mutation(async ({ ctx, input }) => {
      const updateResult = await ctx.db
        .update(userSettings)
        .set({ addEmptyItemsToShoppingList: input.newSetting })
        .where(eq(userSettings.userId, ctx.session.user.id))
        .returning({ newSetting: userSettings.addEmptyItemsToShoppingList });

      return CheckSetting(updateResult);
    }),

  setKeepScreenOn: protectedProcedure
    .input(z.object({
      newSetting: z.boolean()
    }))
    .mutation(async ({ ctx, input }) => {
      const updateResult = await ctx.db
        .update(userSettings)
        .set({ keepScreenOnWhileCooking: input.newSetting })
        .where(eq(userSettings.userId, ctx.session.user.id))
        .returning({ newSetting: userSettings.keepScreenOnWhileCooking });

      return CheckSetting(updateResult);
    }),

  setDisplayName: protectedProcedure
    .input(z.object({
      newName: z.string()
    }))
    .mutation(async ({ ctx, input }) => {
      const updateResult = await ctx.db
        .update(users)
        .set({ name: input.newName })
        .where(eq(users.id, ctx.session.user.id))
        .returning({ newSetting: users.name });

      return CheckSetting(updateResult);
    }),

  setUsername: protectedProcedure
    .input(z.object({
      newUsername: z.string()
    }))
    .mutation(async ({ ctx, input }) => {
      const updateResult = await ctx.db
        .update(users)
        .set({ username: input.newUsername })
        .where(eq(users.id, ctx.session.user.id))
        .returning({ newSetting: users.name });

      return CheckSetting(updateResult);
    })
})

function CheckSetting<t>(updateResult: { newSetting: t }[]): APIResult<settingReturn<t>> {
  const setting = updateResult.pop();
  if(!setting) {
    return {
      data: null,
      error: { message: "There was an error updating that setting" }
    }
  }
  return {
    data: setting,
    error: null
  }
}