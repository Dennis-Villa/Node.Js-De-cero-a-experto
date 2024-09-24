import axios from 'axios';
const { get } = axios;

export const httpClientPlugin = {
    get: async( url: string ) => {
        const { data } = await get(url);
        return data;
    },

    post: async( url: string, body: any ) => {
        throw new Error('Not implemented');
    },
    put: async( url: string, body: any ) => {
        throw new Error('Not implemented');

    },
    delete: async( url: string ) => {
        throw new Error('Not implemented');

    },
};