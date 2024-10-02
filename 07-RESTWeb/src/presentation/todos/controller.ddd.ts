import { Request, Response } from "express";
import { CreateTodoDto, TodoRepository, UpdateTodoDto } from '../../domain';

export class TodosController {

    constructor(
        private readonly todoRepository: TodoRepository,
    ){};

    public getTodos = async( request: Request, response: Response ) => {

        const todos = await this.todoRepository.getAll();

        return response.json( todos );
    };

    public getTodoById = async( request: Request, response: Response ) => {

        const id = Number.parseInt( request.params.id );

        if ( isNaN( id ) ) {

            return response.status(400).json({
                error: 'ID argument is not a number'
            });
        }

        try {

            const todo = await this.todoRepository.findById( id );
            
            return response.json( todo );
        }
        catch( error ) {

            return response.status(400).json({
                error: `${ error }`,
            });
        };
    };

    public createTodo = async( request: Request, response: Response ) => {

        const [ error, createTodoDto ] = CreateTodoDto.create( request.body );

        if ( !!error ) {

            return response.status(400).json({ error });
        };

        const newTodo = await this.todoRepository.create( createTodoDto! );

        return response.json( newTodo );
    };

    public updateTodo = async( request: Request, response: Response ) => {

        const [ error, updateTodoDto ] = UpdateTodoDto.create({
            id: request.params.id,
            ...request.body,
        });

        if ( !!error ) {

            return response.status(400).json({ error });
        };

        try {

            const todo = await this.todoRepository.updateById( updateTodoDto! )
            return response.json( todo );
        }
        catch( error ) {

            return response.status(400).json({
                error: `${ error }`
            });
        };
    };

    public deleteTodo = async( request: Request, response: Response ) => {

        const id = Number.parseInt( request.params.id );

        if ( isNaN( id ) ) {

            return response.status(400).json({
                error: 'ID argument is not a number'
            })
        }

        try {
            
            const deletedTodo = await this.todoRepository.deleteById( id );
            return response.json( deletedTodo );
        }
        catch( error ) {

            return response.status(400).json({
                error: `${ error }`,
            });
        };
    };

}