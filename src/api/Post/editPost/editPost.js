import { prisma } from "../../../../generated/prisma-client";

const DELETE = "DELETE";
const EIDT = "EDIT";

export default {
  Mutation: {
    editPost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { id, caption, location, action } = args;
      const { user } = request;
      const post = await prisma.$exists.post({
        id,
        user: {
          id: user.id,
        },
      });

      if (post) {
        if (action === EDIT) {
          return prisma.updatePost({
            dat: {
              caption,
              location,
            },
            where: { id },
          });
        } else if (action === DELETE) {
          return prisma.deletePost({ id });
        }
      } else {
        throw Error("You can not do that.");
      }
    },
  },
};
