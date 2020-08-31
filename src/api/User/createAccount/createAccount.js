import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { username, email, firstName = "", lastName = "", bio = "" } = args;

      const exists1 = await prisma.$exists.user({ username });
      const exists2 = await prisma.$exists.user({ email });
      if (exists1 || exists2) {
        throw Error("This username or email is already exist");
      }
      const user = await prisma.createUser({
        username,
        email,
        firstName,
        lastName,
        bio,
      });
      return true;
    },
  },
};
