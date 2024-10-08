import { Request, Response } from "express";
import { GitHubService } from '../services/github.service';
import { DiscordService } from "../services/discord.service";

export class GithubController {

    constructor(
        private readonly gitHubService: GitHubService,
        private readonly discordService: DiscordService,
    ){};

    webhookHandler = ( request: Request, response: Response ) => {

        const event = request.header('x-github-event') ?? 'unknown';
        // const signature = request.header('x-hub-signature-256') ?? 'unknown';
        const { body: payload } = request;
        let message = '';

        switch ( event ) {
            case 'star':
                
                message = this.gitHubService.onStar( payload );
                break;

            case 'issues':
                
                message = this.gitHubService.onIssue( payload );
                break;
        
            default:

                message = `Unknown event ${ event }`;
                break;
        };

        console.log({ message });

        this.discordService.notify( message )
            .then( () => response.status( 202 ).send('Accepted') )
            .catch( ( error ) => response.status( 500 ).json({ error }) );
    };
};