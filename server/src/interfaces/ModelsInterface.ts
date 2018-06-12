import { AnamneseModel } from '../models/AnamneseModel';
import { PacienteModel } from '../models/PacienteModel';
import { SecretariaModel } from '../models/SecretariaModel';
import { UserModel } from './../models/UserModel';

export interface ModelsInterface {

    Anamnese: AnamneseModel;
    Paciente: PacienteModel;
    Secretaria: SecretariaModel;
    User: UserModel;

}