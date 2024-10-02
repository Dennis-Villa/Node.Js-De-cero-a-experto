import { prisma } from '../../data/postgres';
import { CreateTodoDto, TodoDatasource, TodoEntity, UpdateTodoDto } from '../../domain';

export class TodoDatasourceImplementation implements TodoDatasource {
    
    async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        
        const newTodo = await prisma.todo.create({ data: createTodoDto! });

        return TodoEntity.fromObject( newTodo );
    };

    async getAll(): Promise<TodoEntity[]> {
        
        const todos = await prisma.todo.findMany();

        return todos.map( ( todo ) => {
            return TodoEntity.fromObject( todo ); 
        });
    };

    async findById(id: number): Promise<TodoEntity> {
        
        const todo = await prisma.todo.findUnique({
            where: {
                id: id
            }
        });

        if ( !todo ) {

            throw new Error ( `TODO with id ${ id } not found` );
        }

        return TodoEntity.fromObject( todo );
    };

    async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        
        const id = updateTodoDto!.id;

        const todo = await prisma.todo.findUnique({
            where: {
                id: id
            }
        });

        if ( !todo ) {

            throw new Error ( `TODO with id ${ id } not found` );
        };
        
        const updatedTodo = await prisma.todo.update({
            where: {
                id: id
            },
            data: updateTodoDto!.values
        });

        return TodoEntity.fromObject( updatedTodo );
    };

    async deleteById(id: number): Promise<TodoEntity> {
        
        try {
            const deletedTodo = await prisma.todo.delete({
                where: {
                    id: id,
                }
            });

            return TodoEntity.fromObject( deletedTodo );
        }
        catch( error ) {

            throw new Error ( `TODO with id ${ id } not found` );
        };
    };

}