
export class DiscordService {

    constructor(
        private readonly discordWebhookUrl: string,
    ){};

    async notify( message: string ) {

        const body = {
            content: message,
            // embeds: [
            //     {
            //         image: { url: 'https://m.media-amazon.com/images/I/511-DNZiXcL._AC_UF894,1000_QL80_.jpg' },
            //     },
            // ],
        };

        const response = await fetch( this.discordWebhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( body ),
        });

        if( !response.ok ) {

            console.log( 'Error sending message to Discord' );
            throw new Error( 'Internal server error' );
        };

        return true;
    };
};