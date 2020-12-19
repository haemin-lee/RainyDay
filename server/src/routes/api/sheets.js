import express from 'express'
import User from '@app/models/user'
import Sheet from '@app/models/sheet'

let router = express.Router()

router.get('/', async (req, res, next) => {
    // get user id
    // also what is security
    const user_id = req.headers['X-Authenticated-User']

    try {
        const sheets = await Sheet.find({ user: user_id }).exec()
        res.json(sheets)
    } catch (e) {
        next(e)
    }
})

router.post('/', async (req, res, next) => {
    const user_id = req.headers['X-Authenticated-User']

    try {
        const user = await User.findOneById(user_id).exec()
        let data = req.body
        data.user = user._id
        const sheet = new Sheet(data).save()

        res.json(sheet)
    } catch (e) {
        next(e)
    }
})

export default router
