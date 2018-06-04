import { merge } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';


import { Query } from './query';
import { Mutation } from './mutation';

import { commentResolvers } from './resources/comment/comment.resolvers';
import { postResolvers } from './resources/post/post.resolvers';
import { tokenResolvers } from './resources/token/token.resolvers';
import { userResolvers } from './resources/user/user.resolvers';

import { commentTypes } from './resources/comment/comment.schema';
import { postTypes } from './resources/post/post.schema';
import { tokenTypes } from './resources/token/token.schema';
import { userTypes } from './resources/user/user.schema';

const resolvers = merge(
    commentResolvers,
    postResolvers,
    tokenResolvers,
    userResolvers
);
const SchemaDefinition = `
    type Schema {
        query: Query
        mutation: Mutation
    }

`;

export default makeExecutableSchema({
    typeDefs: [
        SchemaDefinition,
        Query,
        Mutation,
        commentTypes,
        postTypes,
        tokenTypes,
        userTypes
    ],
    resolvers
});