import { commentQueries } from './resources/comment/comment.schema';
import { pacienteQueries } from './resources/paciente/paciente.schema';
import { postQueries } from './resources/post/post.schema';
import { userQueries } from './resources/user/user.schema';
import { secretariaQueries } from './resources/secretaria/secretaria.schema';


const Query = `
    type Query {
        ${commentQueries}
        ${postQueries}
        ${userQueries}
        ${pacienteQueries}
        ${secretariaQueries}
    }
`;

export {
    Query
}