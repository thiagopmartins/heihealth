const pacienteTypes = `

    # Definições do tipo de paciente
    type Paciente {
        id: ID!
        nome: String!
        cpf: String!
        sexo: String!
        telefone: String!
        nascimento: String!
        endereco: String!
        cep: String!
        numero: Int!
        bairro: String!
        cidade: String!
        uf: String!
        createdAt: String!
        updatedAt: String!       
    }

    input PacienteCreateInput {
        nome: String!
        cpf: String!
        sexo: String
        telefone: String!
        nascimento: String
        endereco: String
        cep: String
        numero: Int
        bairro: String
        cidade: String
        uf: String
    }

    input PacienteUpdateInput {
        nome: String!
        cpf: String!
        sexo: String
        telefone: String!
        nascimento: String
        endereco: String
        cep: String
        numero: Int
        bairro: String
        cidade: String
        uf: String
    }
`;

const pacienteQueries = `
    pacientes(first: Int, offset: Int): [ Paciente! ]!
    paciente(id: ID!): Paciente
`;

const pacienteMutations = `
    createPaciente(input: PacienteCreateInput!): Paciente
    updatePaciente(id: ID!, input: PacienteUpdateInput!): Paciente
    deletePaciente(id: ID!): Boolean
`;

export {
    pacienteTypes,
    pacienteQueries,
    pacienteMutations
}