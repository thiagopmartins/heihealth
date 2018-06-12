import { anamneseQueries } from './resources/Anamnese/anamnese.schema';
import { pacienteQueries } from './resources/paciente/paciente.schema';
import { secretariaQueries } from './resources/secretaria/secretaria.schema';
import { userQueries } from './resources/user/user.schema';


const Query = `
    type Query {
        ${anamneseQueries}
        ${pacienteQueries}
        ${secretariaQueries}
        ${userQueries}
    }
`;

export {
    Query
}