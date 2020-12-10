const openid_client = require('openid-client')
const axios = require('axios')
const { AuthorizationCode } = require('simple-oauth2')

openid_client.Issuer.defaultHttpOptions = { timeout: 20000 }

const openid_api_function_names = ['consumer']

// Returns an API instance for OpenID auth with FusionFabric.cloud
// Inspired by code from https://github.com/Schmavery/facebook-chat-api/blob/master/index.js
async function get_client_credentials(
    auth_wellknown,
    client_id,
    client_secret
) {
    const discover = openid_client.Issuer.discover(auth_wellknown)
    const issuer = await discover
    const client = await issuer.Client({
        client_id: client_id,
        client_secret: client_secret,
    })

    const token = await client.grant({
        grant_type: 'client_credentials',
        scope: 'openid',
    })

    const instance = axios.create({
        timeout: 4000,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    let api = {}

    openid_api_function_names.map((name) => {
        api[name] = require(`./src/${name}`)(instance)
    })

    return api
}

// TODO: actually define variables when I sign up for Finastra
// Sets up OAuth 2 client with Finastra
// Requires a callback URL to parse access token
function get_oauth2_client(client_id, client_secret, options) {
    // options: {
    //   tokenHost: base_url,
    //   tokenPath: token_path,
    //   authorizePath: authorize_path,
    // }

    const client = new AuthorizationCode({
        client: {
            id: client_id,
            secret: client_secret,
        },
        auth: options,
    })
    return client
}

// Redirect user to Finastra auth URL/login
// After a successful auth, the user will be redirected
// to a specified callback URL retrieved from the OAuth2 client
function get_auth_uri(client, options) {
    // options: {
    //   redirect_uri: callback_url,
    //   scope: scope,
    // }

    return client.authorizeURL(options)
}

function get_token_options(code, options) {
    // options: {
    //   redirect_uri: callback_url,
    // }

    options['code'] = code
    return options
}

async function get_token(client, token_options) {
    return await client.getToken(token_options)
}

module.exports = {
    get_client_credentials,
    get_oauth2_client,
    get_auth_uri,
    get_token_options,
    get_token,
}
