import * as Sequelize from 'sequelize';
import { genSaltSync, hashSync, compareSync } from 'bcryptjs';

import { BaseModelInterface } from './../interfaces/BaseModelInterface';
import { UserAttributes } from './UserModel';


export interface UserAttributes {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    crm?: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes {
    isPassword(encodedPassword: string, password: string): boolean;
}

export interface UserModel extends BaseModelInterface, Sequelize.Model<UserInstance, UserAttributes> { }

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): UserModel => {
    const User: UserModel = 
        sequelize.define('User', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING(128),
                allowNull: false
            },
            email: {
                type: DataTypes.STRING(128),
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING(128),
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            crm: {
                type: DataTypes.STRING(128),
                unique: true,
                allowNull: true
            }
        }, {
            tableName: 'users',
            /*
                ! hooks são gatilhos, neste caso servirá para criptografar o password do usuário antes de inserir no banco de dados
                ? getSaltSync irá adicionar um valor random ao hash da senha do usuário
            */
            hooks: {
                beforeCreate: (user: UserInstance, options: Sequelize.CreateOptions): void => {
                    const salt = genSaltSync();
                    user.password = hashSync(user.password, salt);
                },
                beforeUpdate: (user: UserInstance, options: Sequelize.CreateOptions): void => {
                    if(user.changed('password')){
                        const salt = genSaltSync();
                        user.password = hashSync(user.password, salt);
                    }
                }                
            }
        });

        User.prototype.isPassword = (encodedPassword: string, password: string): boolean => {
            return compareSync(password, encodedPassword);
        }

    return User;
}