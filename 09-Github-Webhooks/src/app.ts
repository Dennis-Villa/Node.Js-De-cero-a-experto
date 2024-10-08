import express from 'express'
import { envs } from './config';
import { GithubController } from './presentation/github/controller';
import { GitHubService } from './presentation/services/github.service';
import { DiscordService } from './presentation/services/discord.service';

(() => {

    main();
})();

function main() {

    const app = express();
    const gitHubService = new GitHubService();
    const discordService = new DiscordService( envs.DISCORD_WEBHOOK_URL );
    const githubController = new GithubController( 
        gitHubService,
        discordService ,
    );

    app.use( express.json() );
    app.post( '/api/github', githubController.webhookHandler );

    app.listen( envs.PORT, () => {

        console.log( `App Runing on Port ${ envs.PORT }` );
    });
};