import { envs } from './config/plugins/env.plugin';
import { MongoDatabase } from './data/mongo/index';
import { Server } from './presentation/server';

(() => {
    main();
})();

async function main() {

    await MongoDatabase.connect({
        mongoURL: envs.MONGO_DB_URL,
        dbName: envs.MONGO_DB_NAME,
    });

    Server.start();
};