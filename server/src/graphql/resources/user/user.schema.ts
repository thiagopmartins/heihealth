const userTypes = `

    # Definições do tipo de usuário
    type User {
        id: ID!
        name: String!
        email: String!
        crm: String
        createdAt: String!
        updatedAt: String!
        posts(first: Int, offset: Int): [ Post! ]!
    }

    input UserCreateInput {
        name: String!
        email: String!
        password: String!
        crm: String
    }

    input UserUpdateInput {
        name: String!
        email: String!
        crm: String
        password: String
    }

    input UserUpdatePasswordInput {
        password: String!
    
    }
`;

const userQueries = `
    users(first: Int, offset: Int): [ User! ]!
    user(id: ID!): User
    currentUser: User
`;

const userMutations = `
    createUser(input: UserCreateInput!): User
    updateUser(input: UserUpdateInput!): User
    updateUserId(id: ID!, input: UserUpdateInput!): User
    updateUserPassword(input: UserUpdatePasswordInput!): Boolean
    deleteUser: Boolean
    deleteUserId(id: ID!): Boolean
`;

export {
    userTypes,
    userQueries,
    userMutations
}