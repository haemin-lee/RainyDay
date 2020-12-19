const axios = require('axios')

const oauth2_api_function_names = [
    'account_information',
    'consumer',
    'corporate_user_profile',
]

const server_api_function_names = ['users', 'sheets', 'analyze', 'translate']

// Get the access token to create client
async function get_token(code, options = {}) {
    // specify url or default
    const url = options.url || '/oauth/token'
    const token_res = await axios.get(url, { params: { code: code } })
    return token_res
}

// Returns an API instance for OAuth2 auth with FusionFabric.cloud
// Inspired by code from https://github.com/Schmavery/facebook-chat-api/blob/master/index.js
function get_client(access_token, options = {}) {
    const instance = axios.create({
        timeout: 4000,
        headers: {
            Authorization: `Bearer ${access_token}`,
            // use for regular API
            'X-Authenticated-User': options.user_id,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    })
    // is it bad practice to mix import/require?
    // should look into this
    let api = {}
    oauth2_api_function_names.map((name) => {
        api[name] = require(`./src/${name}`)(instance, options)
    })

    // requires custom url
    // idk name it server_url
    // also tfw no planning tfw ur bad tfw
    if (options.user_id)
        server_api_function_names.map((name) => {
            api[name] = require(`./src/${name}`)(instance, options)
        })

    return api
}

module.exports = { get_client, get_token }
