const secretariaTypes = `

    # Definições do tipo de usuário
    type Secretaria {
        id: ID!
        user_id: Int!
        medico_id: Int!
        createdAt: String!
        updatedAt: String!

    }

    input SecretariaCreateInput {
        user_id: Int!
        medico_id: Int!
    }   
`;

const secretariaQueries = `
    secretarias(id: ID!, first: Int, offset: Int): [ Secretaria! ]!
    secretaria(id: ID!): Secretaria
`;

const secretariaMutations = `
    createSecretaria(input: SecretariaCreateInput!): Secretaria
    deleteSecretaria(id: ID!): Boolean
`;

export {
    secretariaTypes,
    secretariaQueries,
    secretariaMutations
}