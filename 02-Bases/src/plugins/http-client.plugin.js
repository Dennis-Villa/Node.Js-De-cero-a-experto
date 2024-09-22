const { get } = require('axios');

const httpClientPlugin = {
    get: async(url) => {
        const { data } = await get(url);
        return data;
    },

    post: async(url, body) => {},
    put: async(url, body) => {},
    delete: async(url) => {},
};

module.exports = {
    httpClientPlugin,
};