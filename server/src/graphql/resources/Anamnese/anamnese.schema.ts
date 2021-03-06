const anamneseTypes = `

    # Definições do tipo de usuário
    type Anamnese {
        id: ID!
        conteudo: String!
        medico_id: Int!
        paciente_id: Int!
        createdAt: String!
        updatedAt: String!
    }

    input AnamneseCreateInput {
        conteudo: String!
        medico_id: Int!
        paciente_id: Int!
    }

    input AnamneseUpdateInput {
        conteudo: String!
    }
`;

const anamneseQueries = `
    anamneses(first: Int, offset: Int): [ Anamnese! ]!
    anamnese(id: ID!): Anamnese
    anamnesePaciente(paciente_id: Int!): [ Anamnese! ]!
`;

const anamneseMutations = `
    createAnamnese(input: AnamneseCreateInput!): Anamnese
    updateAnamnese(id:ID!, input: AnamneseUpdateInput!): Anamnese
    deleteAnamnese(id: ID!): Boolean
`;

export {
    anamneseTypes,
    anamneseQueries,
    anamneseMutations
}