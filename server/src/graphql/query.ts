import { commentQueries } from './resources/comment/comment.schema';
import { pacienteQueries } from './resources/paciente/paciente.schema';
import { postQueries } from './resources/post/post.schema';
import { userQueries } from './resources/user/user.schema';


const Query = `
    type Query {
        ${commentQueries}
        ${postQueries}
        ${userQueries}
        ${pacienteQueries}
    }
`;

export {
    Query
}