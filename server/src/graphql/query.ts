import { anamneseQueries } from './resources/Anamnese/anamnese.schema';
import { commentQueries } from './resources/comment/comment.schema';
import { pacienteQueries } from './resources/paciente/paciente.schema';
import { postQueries } from './resources/post/post.schema';
import { secretariaQueries } from './resources/secretaria/secretaria.schema';
import { userQueries } from './resources/user/user.schema';


const Query = `
    type Query {
        ${anamneseQueries}
        ${commentQueries}
        ${pacienteQueries}
        ${postQueries}
        ${secretariaQueries}
        ${userQueries}
    }
`;

export {
    Query
}