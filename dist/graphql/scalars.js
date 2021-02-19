"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
exports.default = {
    IsoDate: new graphql_1.GraphQLScalarType({
        name: 'IsoDate',
        description: 'A date and time, represented as an ISO-8601 string',
        serialize: value => {
            if (value instanceof Date) {
                return value.toISOString();
            }
            else {
                return value;
            }
        },
        parseValue: value => new Date(value),
        //@ts-ignore
        parseLiteral: ast => new Date(ast.value),
    }),
};
