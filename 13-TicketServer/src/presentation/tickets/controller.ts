import { Request, Response } from "express";
import { TicketService } from '../services/ticket.service';

export class TicketController {

    constructor(
        private readonly ticketService = new TicketService(),
    ){};

    public getTickets = async( request: Request, response: Response ) => {

        response.json( this.ticketService.tickets );
    };

    public getLastTicketNumber = async( request: Request, response: Response ) => {

        response.json( this.ticketService.lastTicketNumber() );
    };

    public getPendingTickets = async( request: Request, response: Response ) => {

        response.json( this.ticketService.pendingTickets() );
    };

    public drawTicket = async( request: Request, response: Response ) => {

        const { desk } = request.params;

        response.json( this.ticketService.drawTicket( desk ) );
    };

    public workingOn = async( request: Request, response: Response ) => {

        response.json( this.ticketService.lastWorkingOnTickets );
    };

    public createTicket = async( request: Request, response: Response ) => {

        response.status( 201 ).json( this.ticketService.createTicket() );
    };
    
    public ticketFinished = async( request: Request, response: Response ) => {

        const { ticketId } = request.params;

        response.json( this.ticketService.finishTicket( ticketId ) );
    };
};