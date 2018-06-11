const secretariaTypes = `

    # Definições do tipo de usuário
    type Secretaria {
        id: ID!
        createdAt: String!
        updatedAt: String!
        user_id: Int!
        medico_id: Int!
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
    deleteSecretaria: Boolean
`;

export {
    secretariaTypes,
    secretariaQueries,
    secretariaMutations
}