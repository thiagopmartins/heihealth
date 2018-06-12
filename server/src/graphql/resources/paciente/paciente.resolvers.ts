import { handleError, throwError } from './../../../utils/utils';
import { Transaction } from "sequelize";
import { GraphQLResolveInfo } from "graphql";

import { authResolvers } from './../../composable/auth.resolver';
import { AuthUser } from './../../../interfaces/AuthUserInterface';
import { compose } from '../../composable/composable.resolver';
import { DbConnection } from "../../../interfaces/DbConnectionInterface";
import { RequestedFields } from './../../ast/RequestedFields';
import { PacienteInstance } from '../../../models/PacienteModel';

export const pacienteResolvers = {

    // ! PARAMETROS PADRÃO PARA OS RESOLVERS: (parent, args, context, info)
    Query: {

        pacientes: (parent, { first = 10, offset = 0 }, { db, requestedfields }: { db: DbConnection, requestedfields: RequestedFields }, info: GraphQLResolveInfo) => {
            return db.Paciente
                .findAll({
                    limit: first,
                    offset: offset,
                    attributes: requestedfields.getFields(info, { keep: ['id'], exclude: ['posts'] })
                }).catch(handleError);
        },

        paciente: (parent, { id }, { db, requestedfields }: { db: DbConnection, requestedfields: RequestedFields }, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db.Paciente
                .findById(id, {
                    attributes: requestedfields.getFields(info, { keep: ['id'], exclude: ['posts'] })
                })
                .then((paciente: PacienteInstance) => {
                    throwError(!paciente, `Paciente ID ${id} não existe!`);
                    return paciente;
                })
                .catch(handleError);
        },

        pacienteCpf: (parent, { cpf }, { db, requestedfields }: { db: DbConnection, requestedfields: RequestedFields }, info: GraphQLResolveInfo) => {
            return db.Paciente
                .findOne({
                    where: { cpf: cpf },
                    attributes: requestedfields.getFields(info, { keep: ['id'], exclude: ['posts'] })
                })
                .then((paciente: PacienteInstance) => {
                    throwError(!paciente, `Paciente ${cpf} não existe!`);
                    return paciente;
                })
                .catch(handleError);
        }        
    },

    Mutation: {

        createPaciente: compose(...authResolvers)((parent, { input }, { db }: { db: DbConnection, authUser: AuthUser }, info: GraphQLResolveInfo) => {
            return db.sequelize.transaction((t: Transaction) => {
                return db.Paciente
                    .create(input, { transaction: t });
            }).catch(handleError);
        }),

        updatePaciente: compose(...authResolvers)((parent, { input, id }, { db }: { db: DbConnection, authUser: AuthUser }, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.Paciente
                    .findById(id)
                    .then((paciente: PacienteInstance) => {
                        throwError(!paciente, `Paciente ID ${id} não existe!`);
                        return paciente.update(input, { transaction: t });
                    })
            }).catch(handleError);
        }),

        deletePaciente: compose(...authResolvers)((parent, { id }, { db }: { db: DbConnection, authUser: AuthUser }, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.Paciente
                    .findById(id)
                    .then((paciente: PacienteInstance) => {
                        throwError(!paciente, `Usuário ID ${id} não existe!`);
                        return paciente.destroy({ transaction: t })
                            .then(user => !!paciente);
                    })
            }).catch(handleError);
        }),
    }

};