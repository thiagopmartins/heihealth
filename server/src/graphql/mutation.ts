import { commentMutations } from './resources/comment/comment.schema';
import { pacienteMutations } from './resources/paciente/paciente.schema';
import { postMutations } from './resources/post/post.schema';
import { tokenMutations } from './resources/token/token.schema';
import { userMutations } from './resources/user/user.schema';

const Mutation = `
    type Mutation {
        ${commentMutations}
        ${postMutations}
        ${tokenMutations}
        ${userMutations}
        ${pacienteMutations}
    }
`;
export {
    Mutation
}