import { Request, Response } from "express";

const todos = [
    {
        id: 1,
        text: 'Buy milk',
        completedAt: new Date(),
    },
    {
        id: 2,
        text: 'Buy bread',
        completedAt: null,
    },
    {
        id: 3,
        text: 'Buy butter',
        completedAt: new Date(),
    },
];

export class TodosController {

    constructor(

    ){};

    public getTodos = ( request: Request, response: Response ) => {

        return response.json( todos );
    };

    public getTodoById = ( request: Request, response: Response ) => {

        const id = Number.parseInt( request.params.id );

        if ( isNaN( id ) ) {

            return response.status(400).json({
                error: 'ID argument is not a number'
            })
        }

        const todo = todos.find( todo => todo.id === id );

        const resp = ( todo )
            ? response.json( todo )
            : response.status(404).json({
                error: `TODO with id ${ id } not found`
            })
        
        return resp;
    };

    public createTodo = ( request: Request, response: Response ) => {

        const { text } = request.body;

        if ( !text ) {

            return response.status(400).json({
                error: 'Text property is required'
            });
        };

        const newTodo = {
            id: todos.length + 1,
            text,
            completedAt: new Date(),
        };

        todos.push( newTodo );

        return response.json( newTodo );
    };

    public updateTodo = ( request: Request, response: Response ) => {

        const id = Number.parseInt( request.params.id );

        if ( isNaN( id ) ) {

            return response.status(400).json({
                error: 'ID argument is not a number'
            });
        };

        const todo = todos.find( todo => todo.id === id );

        if ( !todo ) {

            return response.status(400).json({
                error: `TODO with ID ${ id } not found`
            });
        };

        const { text, completedAt } = request.body;
        todo.text = text || todo.text;

        ( completedAt === null )
            ? todo.completedAt = null
            : todo.completedAt = new Date( completedAt || todo.completedAt );
        
        return response.json( todo );
    };

    public deleteTodo = ( request: Request, response: Response ) => {

        const id = Number.parseInt( request.params.id );

        if ( isNaN( id ) ) {

            return response.status(400).json({
                error: 'ID argument is not a number'
            })
        }

        const todoIndex = todos.findIndex( todo => todo.id === id );

        if ( todoIndex === -1 ) {

            return response.status(400).json({
                error: `TODO with ID ${ id } not found`
            });
        };

        const deletedTodo = todos.splice( todoIndex, 1 );
        
        return response.json( deletedTodo );
    };

}