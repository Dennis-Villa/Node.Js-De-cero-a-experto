import { Request, Response } from "express";
import { CreateTodo, CreateTodoDto, DeleteTodo, GetTodo, GetTodos, TodoRepository, UpdateTodo, UpdateTodoDto } from '../../domain';

export class TodosController {

    constructor(
        private readonly todoRepository: TodoRepository,
    ){};

    public getTodos = ( request: Request, response: Response ) => {

        return new GetTodos( this.todoRepository )
            .execute()
            .then( (todos) => {

                return response.json( todos );
            })
            .catch( (error) => {

                return response.status(400).json({
                    error: `${ error }`,
                });
            });

    };

    public getTodoById = async( request: Request, response: Response ) => {

        const id = Number.parseInt( request.params.id );

        if ( isNaN( id ) ) {

            return response.status(400).json({
                error: 'ID argument is not a number'
            });
        }

        return new GetTodo( this.todoRepository )
            .execute( id )
            .then( (todo) => {

                return response.json( todo );
            })
            .catch( (error) => {

                return response.status(400).json({
                    error: `${ error }`,
                });
            });
    };

    public createTodo = async( request: Request, response: Response ) => {

        const [ error, createTodoDto ] = CreateTodoDto.create( request.body );

        if ( !!error ) {

            return response.status(400).json({ error });
        };

        return new CreateTodo( this.todoRepository )
            .execute( createTodoDto! )
            .then( (todo) => {

                return response.json( todo );
            })
            .catch( (error) => {

                return response.status(400).json({
                    error: `${ error }`,
                });
            });
    };

    public updateTodo = async( request: Request, response: Response ) => {

        const [ error, updateTodoDto ] = UpdateTodoDto.create({
            id: request.params.id,
            ...request.body,
        });

        if ( !!error ) {

            return response.status(400).json({ error });
        };

        return new UpdateTodo( this.todoRepository )
            .execute( updateTodoDto! )
            .then( (todo) => {

                return response.json( todo );
            })
            .catch( (error) => {

                return response.status(400).json({
                    error: `${ error }`,
                });
            });
    };

    public deleteTodo = async( request: Request, response: Response ) => {

        const id = Number.parseInt( request.params.id );

        if ( isNaN( id ) ) {

            return response.status(400).json({
                error: 'ID argument is not a number'
            })
        }

        return new DeleteTodo( this.todoRepository )
            .execute( id )
            .then( (todo) => {

                return response.json( todo );
            })
            .catch( (error) => {

                return response.status(400).json({
                    error: `${ error }`,
                });
            });
    };

}