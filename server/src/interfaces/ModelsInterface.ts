import { AnamneseModel } from '../models/AnamneseModel';
import { CommentModel } from './../models/CommentModel';
import { PacienteModel } from '../models/PacienteModel';
import { PostModel } from './../models/PostModel';
import { SecretariaModel } from '../models/SecretariaModel';
import { UserModel } from './../models/UserModel';

export interface ModelsInterface {

    Anamnese: AnamneseModel;
    Comment: CommentModel;
    Paciente: PacienteModel;
    Post: PostModel;    
    Secretaria: SecretariaModel;
    User: UserModel;

}