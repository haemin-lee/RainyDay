import express from 'express'
import {
    get_oauth2_client,
    get_token_options,
    get_token,
    get_auth_uri,
} from 'finastra-api-server'
import { get_client } from 'finastra-api-client'

import config from '@app/config'

import User from '@app/models/user'

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
router.get('/token', async (req, res, next) => {
    const code = req.query.code
    const token_options = get_token_options(code, {
        redirect_uri: config.redirect_uri,
    })

    const access_token_obj = await get_token(oauth, token_options)
    const access_token = access_token_obj.token.access_token

    const client = get_client(access_token)
    const finastra_user_res = await client.corporate_user_profile.get_logged_in_user()
    const finastra_user = finastra_user_res.data

    try {
        // find or create new user
        let user = await User.findOne({ finastra_id: finastra_user.id })
            .lean()
            .exec()

        if (!user) {
            user = await new User({
                firstName: finastra_user.firstName,
                lastName: finastra_user.lastName,
                finastra_id: finastra_user.id,
            }).save()
            const u = user.toObject()
            u.access_token = access_token
            return res.json(u)
        }

        res.json(user)
    } catch (e) {
        console.log(e)
        next(e)
    }
})

// Ensure access token is still good and nothing bad happened to user
// It's a hackathon I'll do this later...
router.get('/login', async (req, res, next) => {
    const access_token = req.query.access_token

    const client = get_client(access_token)
    const finastra_user_res = await client.corporate_user_profile.get_logged_in_user()
    const finastra_user = finastra_user_res.data

    try {
        // find or create new user
        let user = await User.findOne({ finastra_id: finastra_user.id })
            .lean()
            .exec()
        // awk
        if (!user) throw 'user does not exist'

        user.access_token = access_token

        res.json(user)
    } catch (e) {
        console.log(e)
        next(e)
    }
})

export default router
