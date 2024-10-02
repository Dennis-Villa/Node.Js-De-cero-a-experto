import { Router } from "express";
import { TodosController } from './controller';
import { TodoRepositoryImplementation } from "../../infrastructure/repositories/todo.repository.implementation";
import { TodoDatasourceImplementation } from "../../infrastructure/datasources/todo.datasource.implementation";

const todoRepository = new TodoRepositoryImplementation(
    new TodoDatasourceImplementation(),
);

export class TodosRoutes {

    static get routes(): Router {

        const router = Router();

        const todosController = new TodosController( todoRepository );

        router.get('/', todosController.getTodos );
        router.get('/:id', todosController.getTodoById );

        router.post('/', todosController.createTodo );

        router.put('/:id', todosController.updateTodo );

        router.delete('/:id', todosController.deleteTodo );

        return router;
    }

}