import { ConvexError, v } from "convex/values";
import { internalMutation } from "./_generated/server";

export const getUserById = internalMutation({
  args: {
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((user) => user.eq(user.field("clerkId"), args.clerkId))
      .unique();
    if (!user) {
      throw new ConvexError("User not found");
    }
    return user;
  },
});

export const createUser = internalMutation({
  args: {
    clerkId: v.string(),
    name: v.string(),
    email: v.string(),
    imageUrl: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("users", {
      clerkId: args.clerkId,
      name: args.name,
      email: args.email,
      imageUrl: args.imageUrl,
    });
  },
});

export const updateUser = internalMutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    imageUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const currentUser = await ctx.db
      .query("users")
      .filter((user) => user.eq(user.field("clerkId"), args.clerkId))
      .unique();
    if (!currentUser) {
      throw new ConvexError("User not found");
    }

    await ctx.db.patch(currentUser._id, {
      email: args.email,
      imageUrl: args.imageUrl,
    });

    // Update user image for all of his podcasts
    const podcasts = await ctx.db
      .query("podcasts")
      .filter((podcast) => podcast.eq(podcast.field("authorId"), args.clerkId))
      .collect();

    await Promise.all(
      podcasts.map(async (podcast) => {
        await ctx.db.patch(podcast._id, {
          authorImageUrl: args.imageUrl,
        });
      })
    );
  },
});

export const deleteUser = internalMutation({
  args: {
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    const currentUser = await ctx.db
      .query("users")
      .filter((user) => user.eq(user.field("clerkId"), args.clerkId))
      .unique();
    if (!currentUser) {
      throw new ConvexError("User not found");
    }

    await ctx.db.delete(currentUser._id);
  },
});
