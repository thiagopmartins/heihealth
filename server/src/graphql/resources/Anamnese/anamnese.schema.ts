const anamneseTypes = `

    # Definições do tipo de usuário
    type Anamnese {
        id: ID!
        conteudo: String!
        medico_id: Int!;
        paciente_id: Int!
        createdAt: String!
        updatedAt: String!
    }

    input AnamneseCreateInput {
        conteudo: String!
        medico_id: Int!
        paciente_id: Int!
    }
`;

const anamneseQueries = `
    anamneses(first: Int, offset: Int): [ Anamnese! ]!
    anamnese(id: ID!): Anamnese
`;

const anamneseMutations = `
    createAmnese(input: AnamneseCreateInput!): Anamnese
    updateAmnese(id:ID!, input: AnamneseCreateInput!): Anamnese
    deleteAmnese(id: ID!): Boolean
`;

export {
    anamneseTypes,
    anamneseQueries,
    anamneseMutations
}