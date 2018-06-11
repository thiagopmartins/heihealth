import * as Sequelize from 'sequelize';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';

import { BaseModelInterface } from './../interfaces/BaseModelInterface';
import { SecretariaAttributes } from './SecretariaModel';
import { ModelsInterface } from '../interfaces/ModelsInterface';


export interface SecretariaAttributes {
    id?: number;
    user_id?: number;
    medico_id?: number;
}

export interface SecretariaInstance extends Sequelize.Instance<SecretariaAttributes>, SecretariaAttributes { }

export interface SecretariaModel extends BaseModelInterface, Sequelize.Model<SecretariaInstance, SecretariaAttributes> { }

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): SecretariaModel => {
    const Secreataria: SecretariaModel =
        sequelize.define('Secretaria', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            }
        }, {
            tableName: 'secretaria'
        });
        Secreataria.associate = (models: ModelsInterface): void => {
            Secreataria.belongsTo(models.User, {
                foreignKey: {
                    allowNull: false,
                    field: 'user_id',
                    name: 'user_id'                 
                }
            }),
            Secreataria.belongsTo(models.User, {
                foreignKey: {
                    allowNull: false,
                    field: 'medico_id',
                    name: 'medico_id'
                }
            })            
        };            

    return Secreataria;
}