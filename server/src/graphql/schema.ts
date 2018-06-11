import { anamneseResolvers } from './resources/Anamnese/anamnese.resolvers';
import { merge } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';


import { Query } from './query';
import { Mutation } from './mutation';

import { commentResolvers } from './resources/comment/comment.resolvers';
import { pacienteResolvers } from './resources/paciente/paciente.resolvers';
import { postResolvers } from './resources/post/post.resolvers';
import { tokenResolvers } from './resources/token/token.resolvers';
import { userResolvers } from './resources/user/user.resolvers';

import { commentTypes } from './resources/comment/comment.schema';
import { pacienteTypes } from './resources/paciente/paciente.schema';
import { postTypes } from './resources/post/post.schema';
import { tokenTypes } from './resources/token/token.schema';
import { userTypes } from './resources/user/user.schema';
import { secretariaResolvers } from './resources/secretaria/secretaria.resolvers';
import { secretariaTypes } from './resources/secretaria/secretaria.schema';


const resolvers = merge(
    anamneseResolvers,
    commentResolvers,
    pacienteResolvers,
    postResolvers,
    secretariaResolvers,
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
        pacienteTypes,
        postTypes,
        secretariaTypes,
        tokenTypes,
        userTypes
    ],
    resolvers
});