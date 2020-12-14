const axios = require('axios')

const oauth2_api_function_names = ['account_information', 'consumer']

// Get the access token to create client
async function get_token(code, options = {}) {
    // specify url or default
    const url = options.url || '/oauth/token'
    const token_res = await axios.get(url, { params: { code: code } })
    return token_res
}

// Returns an API instance for OAuth2 auth with FusionFabric.cloud
// Inspired by code from https://github.com/Schmavery/facebook-chat-api/blob/master/index.js
function get_client(access_token) {
    const instance = axios.create({
        timeout: 4000,
        headers: {
            Authorization: `Bearer ${access_token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
    // is it bad practice to mix import/require?
    // should look into this
    let api = {}
    oauth2_api_function_names.map((name) => {
        api[name] = require(`./src/${name}`)(instance)
    })
    return api
}

module.exports = { get_client, get_token }
