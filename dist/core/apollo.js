"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const typeDefs_1 = __importDefault(require("~server/graphql/typeDefs"));
const resolvers_1 = __importDefault(require("~server/graphql/resolvers"));
const { PORT = 3000 } = process.env;
const playground = {
    endpoint: `http://localhost:${PORT}/graphql`,
};
const apollo = new apollo_server_express_1.ApolloServer({
    typeDefs: typeDefs_1.default,
    resolvers: resolvers_1.default,
    playground,
});
exports.default = apollo;
