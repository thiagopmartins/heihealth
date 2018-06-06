import gql from 'graphql-tag'

export const QUERY_PACIENTES = gql`
    query {
        pacientes(first: 1000, offset: 0){
            id
            nome
            cpf
            telefone
            sexo
            nascimento
            endereco
            cep
            numero
            bairro
            cidade
            uf
        }
    }
`;

export const MUTATION_DELETE_PACIENTE = gql`
    mutation deletePaciente($id: ID!){
        deletePaciente(id: $id)
    }
`;

export const MUTATION_CREATE_PACIENTE = gql`
    mutation createPaciente($input: PacienteCreateInput!){
        createPaciente(input: $input){
            id
        }
    }
`;




