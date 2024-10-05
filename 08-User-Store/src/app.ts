import { envs } from './config/envs';
import { MongoDatabase } from './data';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';


(async()=> {
  main();
})();


async function main() {

  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL, 
    dbName: envs.MONGO_DB_NAME,
  });

  const appRoutes = new AppRoutes( envs );

  const server = new Server({
    port: envs.PORT,
    routes: appRoutes.routes,
  });

  server.start();
}