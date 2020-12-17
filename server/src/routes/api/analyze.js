import express from 'express'
import Sheet from '@app/models/sheet'

let router = express.Router()

// dew it
// Proxy request to flask server
router.get('/', async (req, res, next) => {
    const user_id = req.headers['X-Authenticated-User']

    try {
        const sheets = await Sheet.find({ user: user_id }).exec()
        res.json(sheets)
    } catch (e) {
        next(e)
    }
})

export default router
