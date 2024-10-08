import type { Handler, HandlerContext, HandlerEvent } from "@netlify/functions";
import crypto from 'crypto';

const verifySignature = ( githubSignature: string, payload: object ): boolean => {

    try {

        const secretToken = process.env.SECRET_TOKEN ?? '';
        const body = JSON.stringify(payload);

        const mySignature = crypto
            .createHmac( 'sha256', secretToken )
            .update( body )
            .digest( 'hex' );
        
        const trusted = Buffer.from( `sha256=${ mySignature }`, 'ascii' );
        const untrusted = Buffer.from( githubSignature, 'ascii' );

        return crypto.timingSafeEqual( trusted, untrusted );
    }
    catch (error) {

        console.log( error );
        return false;
    };
};

const onStar = ( payload: any ): string => {
    
    const { action, sender, repository } = payload;
    
    return `User ${ sender.login } ${ action } star on ${ repository.full_name }`;
};

const onIssue = ( payload: any ): string => {
    
    const { action, issue, repository } = payload;
    
    return `An issue was ${ action }, with this title: ${ issue?.title }, on ${ repository?.full_name }`;
};

const notify = async( message: string ) => {

    const body = { content: message };

    const response = await fetch( process.env.DISCORD_WEBHOOK_URL ?? '' , {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( body ),
    });

    if( !response.ok ) {

        console.log( 'Error sending message to Discord' );
        throw 'Error sending message to Discord';
    };

    return true;
};

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    
    const githubEvent = event.headers['x-github-event'] ?? 'unknown';
    const githubSignature = event.headers['x-hub-signature-256'] ?? 'unknown';
    const payload = JSON.parse( event.body ?? '{}');



    const validRequest = verifySignature( githubSignature, payload );
    if ( !validRequest ) {

        return {
            statusCode: 401,
            body: JSON.stringify({
                error: 'Invalid signature',
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        };
    };

    let message = '';
    
        switch ( githubEvent ) {
            case 'star':
                
                message = onStar( payload );
                break;

            case 'issues':
                
                message = onIssue( payload );
                break;
        
            default:

                message = `Unknown event ${ event }`;
                break;
        };

    await notify( message );

    return {
        statusCode: 200,
        body: JSON.stringify({
            message
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    };
};
