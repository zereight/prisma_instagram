import "./env";

import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./scheme";
// import passport from "passport";
import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middlewares";
import "./passport";

const PORT = process.env.PORT;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAuthenticated }),
});

server.express.use(logger("dev"));
server.express.use(authenticateJwt);

server.start({ port: PORT }, () => {
  console.log(`Server running on ${PORT}`);
});
