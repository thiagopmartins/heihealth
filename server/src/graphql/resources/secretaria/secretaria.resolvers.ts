import { handleError, throwError } from './../../../utils/utils';
import { Transaction } from "sequelize";
import { GraphQLResolveInfo } from "graphql";

import { authResolvers } from './../../composable/auth.resolver';
import { AuthUser } from './../../../interfaces/AuthUserInterface';
import { compose } from '../../composable/composable.resolver';
import { DbConnection } from "../../../interfaces/DbConnectionInterface";
import { RequestedFields } from './../../ast/RequestedFields';
import { SecretariaInstance } from "../../../models/SecretariaModel";
import { DataLoaders } from '../../../interfaces/DataLoadersInterface';

export const secretariaResolvers = {

    // ! PARAMETROS PADRÃO PARA OS RESOLVERS: (parent, args, context, info)

    Query: {

        secretarias: (parent, { id, first = 10, offset = 0 }, { db, requestedfields }: { db: DbConnection, requestedfields: RequestedFields }, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db.Secretaria
                .findAll({
                    limit: first,
                    offset: offset,
                    attributes: requestedfields.getFields(info, { keep: ['id'], exclude: ['posts'] }),
                    where: { medico_id: id }
                }).catch(handleError);
        },

        secretaria: (parent, { id }, { db, requestedfields }: { db: DbConnection, requestedfields: RequestedFields }, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db.Secretaria
                .findAll({
                    attributes: requestedfields.getFields(info, { keep: ['id'], exclude: ['posts'] }),
                    where: { user_id: id }
                }).catch(handleError);
        },
    },

    Mutation: {

        createSecretaria: compose(...authResolvers)((parent, { input }, { db }: { db: DbConnection }, info: GraphQLResolveInfo) => {
            return db.sequelize.transaction((t: Transaction) => {
                return db.Secretaria
                    .create(input, { transaction: t });
            }).catch(handleError);
        }),

        deleteSecretaria: compose(...authResolvers)((parent, { id }, { db, authUser }: { db: DbConnection, authUser: AuthUser }, info: GraphQLResolveInfo) => {
            id = parseInt(id);
            return db.sequelize.transaction((t: Transaction) => {
                return db.Secretaria
                    .findOne({ where: { user_id: id } })
                    .then((secretaria: SecretariaInstance) => {
                        throwError(!secretaria, `Secretaria ID ${id} não existe!`);
                        return secretaria.destroy({ transaction: t })
                            .then(secretaria => !!secretaria);
                    })
            }).catch(handleError);
        }),
    }

};