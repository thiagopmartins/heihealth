import * as Sequelize from 'sequelize';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';

import { BaseModelInterface } from './../interfaces/BaseModelInterface';


export interface PacienterAttributes {
    id?: number;
    nome?: string;
    cpf?: string;
    sexo?: string;
    telefone?: string;
    nascimento?: string;
    endereco?: string;
    cep?: string;
    numero?: number;
    bairro?: string;
    cidade?: string;
    uf?: string;
    createdAt?: string;
    updatedAt?: string;    
}

export interface PacienteInstance extends Sequelize.Instance<PacienterAttributes> { };

export interface PacienteModel extends BaseModelInterface, Sequelize.Model<PacienteInstance, PacienterAttributes> { }

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): PacienteModel => {
    const Paciente: PacienteModel = 
        sequelize.define('Paciente', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            nome: {
                type: DataTypes.STRING(128),
                allowNull: false
            },
            cpf: {
                type: DataTypes.STRING(128),
                allowNull: false,
                unique: true
            },
            sexo: {
                type: DataTypes.STRING(128),
                allowNull: true
            },
            telefone: {
                type: DataTypes.STRING(128),
                allowNull: false
            },
            nascimento: {
                type: DataTypes.STRING(128),
                allowNull: true
            },
            endereco: {
                type: DataTypes.STRING(128),
                allowNull: true
            },
            cep: {
                type: DataTypes.STRING(128),
                allowNull: true
            }
            ,
            numero: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            bairro: {
                type: DataTypes.STRING(128),
                allowNull: true
            },
            cidade: {
                type: DataTypes.STRING(128),
                allowNull: true
            },
            uf: {
                type: DataTypes.STRING(2),
                allowNull: true
            }        
        }, {
            tableName: 'pacientes',
            /*
                ! hooks são gatilhos, neste caso servirá para criptografar o password do usuário antes de inserir no banco de dados
                ? getSaltSync irá adicionar um valor random ao hash da senha do usuário
            */
        });

    return Paciente;
}