import { Request, Response } from "express";
import { CreateTodo, CreateTodoDto, DeleteTodo, GetTodo, GetTodos, TodoRepository, UpdateTodo, UpdateTodoDto } from '../../domain';
import { CustomError } from "../../domain/errors/custom.error";

export class TodosController {

    constructor(
        private readonly todoRepository: TodoRepository,
    ){};

    private handleError( response: Response, error: Error | CustomError ) {

        if( error instanceof CustomError ) {

            return response.status( 
                error.statusCode 
            ).json({
                error: error.message,
            });
        };

        return response.status(500).json({
            error: `Internal Server Error: ${ error }`,
        });
    };

    public getTodos = ( request: Request, response: Response ) => {

        return new GetTodos( this.todoRepository )
            .execute()
            .then( (todos) => {

                return response.json( todos );
            })
            .catch( (error) => this.handleError( response, error ));

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
            .catch( (error) => this.handleError( response, error ));
    };

    public createTodo = async( request: Request, response: Response ) => {

        const [ error, createTodoDto ] = CreateTodoDto.create( request.body );

        if ( !!error ) {

            return response.status(400).json({ error });
        };

        return new CreateTodo( this.todoRepository )
            .execute( createTodoDto! )
            .then( (todo) => {

                return response.status(201).json( todo );
            })
            .catch( (error) => this.handleError( response, error ));
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
            .catch( (error) => this.handleError( response, error ));
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
            .catch( (error) => this.handleError( response, error ));
    };

}