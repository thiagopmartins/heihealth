import { RequestedFields } from './graphql/ast/RequestedFields';
import { DataLoaderFactory } from './graphql/dataloaders/DataloaderFactory';
import * as express from 'express';
import * as graphqlHTTP from 'express-graphql';
import * as cors from 'cors';
import * as compression from 'compression';
import * as helmet from 'helmet';

import db from './models';
import schema from './graphql/schema';
import { extractJwtMiddleware } from './middlewares/extract-jwt.middleware';


class App {

    public express: express.Application;
    private dataLoaderFactory: DataLoaderFactory;
    private requestedFields: RequestedFields;
    constructor() {
        this.express = express();
        this.init();
    }

    private init(): void {
        this.requestedFields = new RequestedFields();
        this.dataLoaderFactory = new DataLoaderFactory(db, this.requestedFields);
        this.middleware();
    }

    private middleware(): void {

        this.express.use(cors({
            origin: '*', //! SE NECESSÁRIO PODE DEIXAR APENAS UM DOMÍNIO ACESSAR A API. EX: http://teste.com.br
            methods: ['GET', 'POST'],
            allowedHeaders: ['Content-Type', 'Authorization', 'Accept-Enconding'],
            preflightContinue: false,
            optionsSuccessStatus: 204  
        }));

        this.express.use(compression());

        this.express.use(helmet()); //! SEGURANÇA DA API

        this.express.use('/api',
            extractJwtMiddleware(),
            (req, res, next) => {
                req['context']['db'] = db;
                req['context']['dataloaders'] = this.dataLoaderFactory.getLoaders();
                req['context']['requestedfields'] = this.requestedFields;
                next();
            },
            graphqlHTTP((req) => ({
                schema: schema,
                graphiql: process.env.NODE_ENV.trim() === 'development',
                context: req['context']
            }))
        );

    }
}

export default new App().express;