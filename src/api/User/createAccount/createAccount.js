import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { username, email, firstName = "", lastName = "", bio = "" } = args;
      try {
        const user = await prisma.createUser({
          username,
          email,
          firstName,
          lastName,
          bio,
        });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
