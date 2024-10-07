import { envs } from "../../config";
import { MongoDatabase } from "../mongo/init";
import { CategoryModel } from "../mongo/models/category.model";
import { ProductModel } from "../mongo/models/product.model";
import { UserModel } from "../mongo/models/user.model";
import { seedData } from "./data";

(async() => {
    await MongoDatabase.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoUrl: envs.MONGO_URL,
    });

    await main();

    await MongoDatabase.disconnect();
})();

const randomBetween0AndX = ( x: number ) => {

    return Math.floor( Math.random() * x );
};
async function main() {

    // *Borrar todo
    await Promise.all([
        UserModel.deleteMany(),
        CategoryModel.deleteMany(),
        ProductModel.deleteMany(),
    ]);

    // *Crear Usuarios
    const users = await UserModel.insertMany( seedData.users );

    // *Crear Categorias
    const categories = await CategoryModel.insertMany( 
        seedData.categories.map( ( category ) => {

            const usersLength = seedData.users.length - 1;

            return {
                ...category,
                user: users[ randomBetween0AndX( usersLength ) ]._id,
            }
        })
    );

    // *Crear Categorias
    await ProductModel.insertMany( 
        seedData.products.map( ( product ) => {

            const usersLength = seedData.users.length - 1;
            const categoriesLength = seedData.categories.length - 1;

            return {
                ...product,
                user: users[ randomBetween0AndX( usersLength ) ]._id,
                category: categories[ randomBetween0AndX( categoriesLength ) ]._id,
            }
        })
    );
};