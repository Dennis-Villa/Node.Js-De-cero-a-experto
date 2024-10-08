import { GitHubIssuePayload, GitHubStarPayload } from "../../interfaces";

export class GitHubService {

    constructor(){};

    onStar( payload: GitHubStarPayload ): string {

        const { action, sender, repository } = payload;

        return `User ${ sender.login } ${ action } star on ${ repository.full_name }`;
    };

    onIssue( payload: GitHubIssuePayload ): string {

        const { action, issue, repository } = payload;

        return `An issue was ${ action }, with this title: ${ issue?.title }, on ${ repository?.full_name }`;
    };
};