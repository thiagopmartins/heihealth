import * as Sequelize from 'sequelize';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';

import { BaseModelInterface } from './../interfaces/BaseModelInterface';
import { AnamneseAttributes } from './AnamneseModel';
import { ModelsInterface } from '../interfaces/ModelsInterface';


export interface AnamneseAttributes {
    id?: number;
    conteudo?: string;
    medico_id?: number;
    paciente_id?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface AnamneseInstance extends Sequelize.Instance<AnamneseAttributes>, AnamneseAttributes { }

export interface AnamneseModel extends BaseModelInterface, Sequelize.Model<AnamneseInstance, AnamneseAttributes> { }

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): AnamneseModel => {
    const Anamnese: AnamneseModel =
        sequelize.define('Anamnese', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            conteudo: {
                type: DataTypes.BLOB({
                    length: 'long'
                }),
                allowNull: false
            }
        }, {
            tableName: 'anamnese'
        });
        Anamnese.associate = (models: ModelsInterface): void => {
            Anamnese.belongsTo(models.User, {
                foreignKey: {
                    allowNull: false,
                    field: 'medico_id',
                    name: 'medico_id'                 
                }
            }),
            Anamnese.belongsTo(models.Paciente, {
                foreignKey: {
                    allowNull: false,
                    field: 'paciente_id',
                    name: 'paciente_id'
                }
            })            
        };     

    return Anamnese;
}