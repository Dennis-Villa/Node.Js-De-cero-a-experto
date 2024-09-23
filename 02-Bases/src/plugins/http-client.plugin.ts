import axios from 'axios';
const { get } = axios;

export const httpClientPlugin = {
    get: async( url: string ) => {
        const { data } = await get(url);
        return data;
    },

    post: async( url: string, body: any ) => {},
    put: async( url: string, body: any ) => {},
    delete: async( url: string ) => {},
};