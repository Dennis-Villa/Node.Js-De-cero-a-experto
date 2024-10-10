
export interface Ticket {
    id: string;
    number: number;
    createdAt: Date;
    handledAtDest?: string;
    handledAt?: Date;
    done: boolean;
}