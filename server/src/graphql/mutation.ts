import { anamneseMutations } from './resources/Anamnese/anamnese.schema';
import { pacienteMutations } from './resources/paciente/paciente.schema';
import { secretariaMutations } from './resources/secretaria/secretaria.schema';
import { tokenMutations } from './resources/token/token.schema';
import { userMutations } from './resources/user/user.schema';

const Mutation = `
    type Mutation {
        ${anamneseMutations}
        ${pacienteMutations}
        ${secretariaMutations}
        ${tokenMutations}
        ${userMutations}
    }
`;
export {
    Mutation
}