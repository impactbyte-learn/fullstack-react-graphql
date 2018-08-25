import "reflect-metadata";
import { createConnection } from "typeorm";
import { GraphQLServer } from "graphql-yoga";
import { readFileSync } from "fs";
import { join } from "path";
import * as prettyError from "pretty-error";

import setup from "./setup";
import resolvers from "./resolvers";

process.env.NODE_ENV !== "production" ? prettyError.start() : true;
createConnection(setup).then(connection => {
  console.log("[database] connected!");
  const typeDefs = readFileSync(join(__dirname, "./schema.graphql"), "utf8");
  const server = new GraphQLServer({ resolvers, typeDefs });
  server.start(() => console.log("[server] listening ..."));
});
