import { CommentModel } from './../models/CommentModel';
import { PostModel } from './../models/PostModel';
import { UserModel } from './../models/UserModel';
import { PacienteModel } from '../models/PacienteModel';

export interface ModelsInterface {

    Comment: CommentModel;
    Post: PostModel;    
    User: UserModel;
    Paciente: PacienteModel;

}