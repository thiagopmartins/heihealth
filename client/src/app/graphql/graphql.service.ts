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

export const QUERY_USER = gql`
    query user($id: ID!){
        user(id: $id){
            id
            name
            email
            crm
        }
    }
`;

export const MUTATION_DELETE_USER_ID = gql`
    mutation deleteUserId($id: ID!){
        deleteUserId(id: $id)
    }
`;

export const MUTATION_UPDATE_USER = gql`
    mutation updateUserId($id: ID!, $input: UserUpdateInput!){
        updateUserId(id: $id, input: $input){
            id
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

export const MUTATION_UPDATE_PACIENTE = gql`
    mutation updatePaciente($id: ID!, $input: PacienteUpdateInput!){
        updatePaciente(id: $id, input: $input){
            id
        }
    }
`;

export const MUTATION_CREATE_TOKEN = gql`
    mutation createToken($email: String!, $password: String!) {
        createToken(email: $email, password: $password) {
            token
        }
    }
`;

export const MUTATION_CREATE_USUARIO = gql`
    mutation createUser($input: UserCreateInput!) {
        createUser(input: $input) {
            id
        }
    }
`;

export const MUTATION_CREATE_SECRETARIA = gql`
    mutation createSecretaria($input: SecretariaCreateInput!) {
        createSecretaria(input: $input) {
            id
        }
    }
`;
export const QUERY_SECRETARIAS = gql`
    query secretarias($id: ID!){
        secretarias(id: $id){
            id
            user_id
            medico_id
        }
    }
`;

export const MUTATION_DELETE_SECRETARIA = gql`
    mutation deleteSecretaria($id: ID!){
        deleteSecretaria(id: $id)
    }
`;



