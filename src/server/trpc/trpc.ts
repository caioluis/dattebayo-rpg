import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";

import { type Context } from "./context";
import { clerkClient } from "@clerk/nextjs/server";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  }
});

export const router = t.router;

/**
 * Unprotected procedure
 **/
export const publicProcedure = t.procedure;

/**
 * Reusable middleware to ensure
 * users are logged in
 */
const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.auth.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      auth: ctx.auth
    }
  });
});

const isAdmin = t.middleware(async ({ ctx, next }) => {
  if (!ctx.auth.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  const { publicMetadata } = await clerkClient.users.getUser(ctx.auth.userId);

  if (publicMetadata.cargos !== "admin") {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      auth: ctx.auth
    }
  });
});

/**
 * Admin procedure: used for administrative tasks on the app
 */
export const adminProcedure = t.procedure.use(isAdmin);

/**
 * Protected procedure
 **/
export const protectedProcedure = t.procedure.use(isAuthed);
