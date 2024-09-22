const getIDPlugin = require('../plugins/get-id.plugin');
const getAgePlugin = require('../plugins/get-age.plugin');
const httpClientPlugin = require('../plugins/http-client.plugin');

module.exports = {
    ...getIDPlugin,
    ...getAgePlugin,
    ...httpClientPlugin,
}