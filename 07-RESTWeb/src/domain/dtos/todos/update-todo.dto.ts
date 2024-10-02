
export class UpdateTodoDto {

    private constructor(
        public readonly id: number,
        public readonly text?: string,
        public readonly completedAt?: Date | null,
    ){}

    get values() {

        const returnObj: {[ key: string ]: any } = {};

        if ( !!this.text ) returnObj.text = this.text;
        if ( this.completedAt || this.completedAt === null ) returnObj.completedAt = this.completedAt;

        return returnObj;
    }

    static create( props: { [key: string]: any  }): [ string?, UpdateTodoDto? ] {

        const { id, text, completedAt } = props;
        const numberId = Number.parseInt(id);
        
        if ( !id || isNaN( numberId ) ) {

            return ['id must be a valid number'];
        };

        let newCompletedAt;
        if( completedAt === null || completedAt === "null" ) {

            newCompletedAt = null;
        }
        else if( completedAt ) {

            newCompletedAt = new Date( completedAt );

            if( newCompletedAt.toString() === 'Invalid Date') {
                
                return ["completedAt must be a valid Date"];
            }
        }

        return [undefined, new UpdateTodoDto( numberId, text, newCompletedAt )];
    }

}