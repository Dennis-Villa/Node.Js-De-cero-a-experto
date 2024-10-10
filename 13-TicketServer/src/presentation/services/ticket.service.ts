import { UuidAdapter } from "../../config";
import { Ticket } from "../../domain/interfaces/ticket.interface";
import { WssService } from './wss.service';

export class TicketService {

    private _tickets: Ticket[] = [
        {
            id: UuidAdapter.v4(),
            number: 1,
            createdAt: new Date(),
            done: false,
        },
        {
            id: UuidAdapter.v4(),
            number: 2,
            createdAt: new Date(),
            done: false,
        },
        {
            id: UuidAdapter.v4(),
            number: 3,
            createdAt: new Date(),
            done: false,
        },
        {
            id: UuidAdapter.v4(),
            number: 4,
            createdAt: new Date(),
            done: false,
        },
        {
            id: UuidAdapter.v4(),
            number: 5,
            createdAt: new Date(),
            done: false,
        },
        {
            id: UuidAdapter.v4(),
            number: 6,
            createdAt: new Date(),
            done: false,
        },
    ];

    private readonly _workingOnTickets: Ticket[] = [];

    constructor(
        private readonly wssService = WssService.instance,
    ){};

    public get tickets(): Ticket[] {

        return this._tickets;
    };

    public get workingOnTickets(): Ticket[] {

        return this._workingOnTickets;
    };

    public get lastWorkingOnTickets(): Ticket[] {

        return this._workingOnTickets.slice( 0, 4 );
    };

    public pendingTickets(): Ticket[] {

        return this._tickets.filter( ( ticket ) => 
            ( !ticket.handledAtDest && !ticket.done )
        );
    };

    public lastTicketNumber(): number {

        return this._tickets.length > 0
            ? this._tickets.at( -1 )!.number
            : 0;
    };

    public createTicket(): Ticket {

        const newTicket: Ticket = {
            id: UuidAdapter.v4(),
            number: this.lastTicketNumber() + 1,
            createdAt: new Date(),
            done: false,
        };

        this._tickets.push( newTicket );

        this.ticketNumberChanged();

        return newTicket;
    };

    public drawTicket( desk: string ) {

        const ticket = this._tickets.find( ( ticket ) => 
            ( !ticket.handledAtDest && !ticket.done )
        );

        if ( !ticket ) {
            return {
                status: 'error',
                message: 'No tickets pending',
            };
        };

        ticket.handledAtDest = desk;
        ticket.handledAt = new Date();

        this._workingOnTickets.unshift({
            ...ticket,
        });

        this.ticketNumberChanged();
        this.workingOnChanged();

        return {
            status:'success',
            ticket,
        };
    };

    public finishTicket( id: string ) {

        const ticket = this._tickets.find( ( ticket ) => ticket.id === id );
        if ( !ticket ) {
            return {
                status: 'error',
                message: 'Ticket not found',
            };
        };
        ticket.done = true;
    
        this._tickets = this._tickets.map( ( ticket ) => {

            if ( ticket.id === id ) ticket.done = true;

            return ticket;
        });
      
        this.ticketNumberChanged();

        return {
            status: 'ok',
            ticket,
        };
    };

    private ticketNumberChanged() {

        this.wssService.sendMessage(
            'on-ticket-count-changed',
            this.pendingTickets().length,
        );
    };

    private workingOnChanged() {

        this.wssService.sendMessage(
            'on-working-changed',
            this.workingOnTickets,
        );
    };
};