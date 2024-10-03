import request from 'supertest';
import { testServer } from '../test-server';
import { prisma } from '../../../src/data/postgres/index';

interface Todo {
    id: number; 
    text: string;
    completedAt: string | Date | null; 
}

describe( 'Todo routes', () => {

    const todo1 = { text: 'Test-1' };
    const todo2 = { text: 'Test-2' };
    let todos: Array<Todo>;

    beforeAll(async() => {

        await testServer.start();
    });

    beforeEach(async() => {

        todos = await prisma.todo.createManyAndReturn({
            data: [ todo1, todo2 ]
        });
    });

    afterEach(async() => {

        await prisma.todo.deleteMany();
    });
    
    afterAll(() => {

        testServer.close();
    });

    test('get should return TODOs api/todos', async() => {

        const { body } = await request( testServer.app )
            .get('/api/todos')
            .expect(200);
        
        expect( body ).toBeInstanceOf( Array );
        expect( body.length ).toBe( 2 );
        expect( body[0] ).toEqual(
            expect.objectContaining({
                ...todo1,
                completedAt: null,
            })
        );
        expect( body[1] ).toEqual(
            expect.objectContaining({
                ...todo2,
                completedAt: null,
            })
        );
    });

    test('get should return a TODO by id api/todos/:id', async() => {

        const { id, text, completedAt } = todos[0];

        const { body } = await request( testServer.app )
            .get(`/api/todos/${ id }`)
            .expect(200);
        
        expect( body ).toEqual(
            expect.objectContaining({
                id,
                text,
                completedAt: completedAt,
            })
        );
    });

    test('get should return an error if id not exists api/todos/:id', async() => {

        const id = todos[1].id + 99;

        const { body } = await request( testServer.app )
            .get(`/api/todos/${ id }`)
            .expect(404);        
        
        expect( body ).toEqual({
            error: `TODO with id ${ id } not found`,
        });
    });

    test('post should create a TODO api/todos/', async() => {

        const newTodo = {
            text: 'new-todo-test',
        };

        const { body } = await request( testServer.app )
            .post('/api/todos/')
            .send( newTodo )
            .expect(201);
        
        expect( body ).toEqual(
            expect.objectContaining({
                ...newTodo,
                id: expect.any(Number),
                completedAt: null,
            })
        );
    });

    test('post should return an error if text not submited api/todos/', async() => {

        const { body } = await request( testServer.app )
            .post('/api/todos/')
            .send({})
            .expect(400);
        
        expect( body ).toEqual({
            error: 'Text property is required',
        });
    });

    test('post should return an error if text is empty api/todos/', async() => {

        const { body } = await request( testServer.app )
            .post('/api/todos/')
            .send({ text: ' ' })
            .expect(400);
        
        expect( body ).toEqual({
            error: 'Text property is required',
        });
    });

    test('put should update a TODO api/todos/:id', async() => {

        const id = todos[0].id;
        const updatedTodo = {
            text: 'new-todo-test',
            completedAt: new Date(),
        };

        const { body } = await request( testServer.app )
            .put(`/api/todos/${ id }`)
            .send( updatedTodo )
            .expect(200);
        
        expect( body ).toEqual(
            expect.objectContaining({
                ...updatedTodo,
                completedAt: updatedTodo.completedAt.toISOString(),
                id,
            })
        );
    });

    test('put should return an error if id not exists api/todos/:id', async() => {

        const id = todos[1].id + 99;
        const updatedTodo = {
            text: 'new-todo-test',
            completedAt: new Date(),
        };

        const { body } = await request( testServer.app )
            .put(`/api/todos/${ id }`)
            .send( updatedTodo )
            .expect(404);
        
        expect( body ).toEqual({
            error: `TODO with id ${ id } not found`,
        });
    });

    test('put should update a TODO only the date api/todos/:id', async() => {

        const todo = todos[0];
        const { id } = todo;
        const updatedTodo = {
            completedAt: new Date(),
        };

        const { body } = await request( testServer.app )
            .put(`/api/todos/${ id }`)
            .send( updatedTodo )
            .expect(200);
        
        expect( body ).toEqual(
            expect.objectContaining({
                ...todo,
                completedAt: updatedTodo.completedAt.toISOString(),
                id,
            })
        );
    });

    test('put should update a TODO make the completedAt date null api/todos/:id', async() => {

        const todo = todos[0];
        const { id } = todo;
        const updatedTodo = {
            completedAt: null,
        };

        const { body } = await request( testServer.app )
            .put(`/api/todos/${ id }`)
            .send( updatedTodo )
            .expect(200);
        
        expect( body ).toEqual(
            expect.objectContaining({
                ...todo,
                completedAt: null,
                id,
            })
        );
    });

    test('put should update a TODO only the text api/todos/:id', async() => {

        const todo = todos[0];
        const { id } = todo;
        const updatedTodo = {
            text: 'new-todo-test',
        };

        const { body } = await request( testServer.app )
            .put(`/api/todos/${ id }`)
            .send( updatedTodo )
            .expect(200);
        
        expect( body ).toEqual(
            expect.objectContaining({
                ...todo,
                text: updatedTodo.text,
                id,
            })
        );
    });

    test('delete should delete a TODO api/todos/:id', async() => {

        const todo = todos[0];
        const { id } = todos[0];

        const { body } = await request( testServer.app )
            .delete(`/api/todos/${ id }`)
            .expect(200);
        
        expect( body ).toEqual(
            expect.objectContaining({
                ...todo,
            })
        );
    });

    test('delete should return an error if id not exists api/todos/:id', async() => {

        const id = todos[1].id + 99;

        const { body } = await request( testServer.app )
            .delete(`/api/todos/${ id }`)
            .expect(404);
        
        expect( body ).toEqual({
            error: `TODO with id ${ id } not found`,
        });
    });
});