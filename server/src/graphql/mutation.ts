import { anamneseMutations } from './resources/Anamnese/anamnese.schema';
import { commentMutations } from './resources/comment/comment.schema';
import { pacienteMutations } from './resources/paciente/paciente.schema';
import { postMutations } from './resources/post/post.schema';
import { secretariaMutations } from './resources/secretaria/secretaria.schema';
import { tokenMutations } from './resources/token/token.schema';
import { userMutations } from './resources/user/user.schema';

const Mutation = `
    type Mutation {
        ${anamneseMutations}
        ${commentMutations}
        ${postMutations}
        ${tokenMutations}
        ${userMutations}
        ${pacienteMutations}
        ${secretariaMutations}
    }
`;
export {
    Mutation
}