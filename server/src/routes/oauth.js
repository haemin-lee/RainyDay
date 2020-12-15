import express from 'express'
import {
    get_oauth2_client,
    get_token_options,
    get_token,
    get_auth_uri,
} from 'finastra-api-server'

import config from '@app/config'

const oauth = get_oauth2_client(
    config.finastra_client_id,
    config.finastra_client_secret,
    {
        tokenHost: config.base_url,
        tokenPath: config.token_path,
        authorizePath: config.authorize_path,
    }
)

let router = express.Router()

// Get the OAuth URL
router.get('/auth', (req, res) => {
    const auth_url = get_auth_uri(oauth, {
        redirect_uri: config.redirect_uri,
    })
    res.json({
        url: auth_url,
    })
})

// Send OAuth callback code to get OAuth access token
router.get('/token', async (req, res) => {
    const code = req.query.code
    const token_options = get_token_options(code, {
        redirect_uri: config.redirect_uri,
    })

    const access_token = await get_token(oauth, token_options)
    res.json(access_token)
})

export default router
