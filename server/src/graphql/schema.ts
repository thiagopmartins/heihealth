import { merge } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';

import { Query } from './query';
import { Mutation } from './mutation';

import { anamneseResolvers } from './resources/Anamnese/anamnese.resolvers';
import { pacienteResolvers } from './resources/paciente/paciente.resolvers';
import { secretariaResolvers } from './resources/secretaria/secretaria.resolvers';
import { tokenResolvers } from './resources/token/token.resolvers';
import { userResolvers } from './resources/user/user.resolvers';

import { anamneseTypes } from './resources/Anamnese/anamnese.schema';
import { pacienteTypes } from './resources/paciente/paciente.schema';
import { secretariaTypes } from './resources/secretaria/secretaria.schema';
import { tokenTypes } from './resources/token/token.schema';
import { userTypes } from './resources/user/user.schema';


const resolvers = merge(
    anamneseResolvers,
    pacienteResolvers,
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
        anamneseTypes,
        pacienteTypes,
        secretariaTypes,
        tokenTypes,
        userTypes
    ],
    resolvers
});