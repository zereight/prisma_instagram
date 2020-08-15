import { generateSecret, sendSecretEmail } from "../../../utils";
import { prisma } from "../../../../generated/prisma-client";
export default {
  Mutation: {
    requestSecret: async (_, args) => {
      const { email } = args;
      const loginSecret = generateSecret();
      try {
        await prisma.updateUser({
          data: {
            loginSecret,
          },
          where: {
            email,
          },
        });

        sendSecretEmail(email, `${loginSecret}`);

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
