import { handleError, throwError } from './../../../utils/utils';
import { Transaction } from "sequelize";
import { GraphQLResolveInfo } from "graphql";

import { authResolvers } from './../../composable/auth.resolver';
import { AnamneseInstance } from './../../../models/AnamneseModel';
import { AuthUser } from './../../../interfaces/AuthUserInterface';
import { compose } from '../../composable/composable.resolver';
import { DbConnection } from "../../../interfaces/DbConnectionInterface";
import { RequestedFields } from './../../ast/RequestedFields';

export const anamneseResolvers = {

    // ! PARAMETROS PADRÃO PARA OS RESOLVERS: (parent, args, context, info)
    Query: {

        anamneses: (parent, { first = 10, offset = 0 }, { db, requestedfields }: { db: DbConnection, requestedfields: RequestedFields }, info: GraphQLResolveInfo) => {
            return db.Anamnese
                .findAll({
                    limit: first,
                    offset: offset,
                    attributes: requestedfields.getFields(info, { keep: ['id'], exclude: ['posts'] })
                }).catch(handleError);
        },

        anamnese: (parent, { id }, { db, requestedfields }: { db: DbConnection, requestedfields: RequestedFields }, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db.Anamnese
                .findById(id, {
                    attributes: requestedfields.getFields(info, { keep: ['id'], exclude: ['posts'] })
                })
                .then((anamnese: AnamneseInstance) => {
                    throwError(!anamnese, `Usuário ID ${id} não existe!`);
                    return anamnese;
                })
                .catch(handleError);
        }
    },

    Mutation: {

        createAnamnese: (parent, { input }, { db }: { db: DbConnection }, info: GraphQLResolveInfo) => {
            return db.sequelize.transaction((t: Transaction) => {
                return db.Anamnese
                    .create(input, { transaction: t });
            }).catch(handleError);
        },

        updateAnamnese: compose(...authResolvers)((parent, { id, input }, { db, authUser }: { db: DbConnection, authUser: AuthUser }, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.Anamnese
                    .findById(id)
                    .then((anamnese: AnamneseInstance) => {
                        throwError(!anamnese, `Anamnese ID ${id} não existe!`);
                        return anamnese.update(input, { transaction: t });
                    })
            }).catch(handleError);
        }),

        deleteAnamnese: compose(...authResolvers)((parent, { id }, { db, authUser }: { db: DbConnection, authUser: AuthUser }, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.Anamnese
                    .findById(id)
                    .then((anamnese: AnamneseInstance) => {
                        throwError(!anamnese, `Anamnese ID ${id} não existe!`);
                        return anamnese.destroy({ transaction: t })
                            .then(anamnese => !!anamnese);
                    })
            }).catch(handleError);
        })
    }

};