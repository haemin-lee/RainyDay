import express from 'express'
import User from '@app/models/user'

let router = express.Router()

// CRUD
// create new user
router.post('/', async (req, res, next) => {
    try {
        const user = await new User(req.body).save().exec()
        res.json(user)
    } catch (e) {
        next(e)
    }
})

// get user
router.get('/:id', async (req, res, next) => {
    const user_id = req.params.id
    try {
        const user = await User.findOne({ finastra_id: user_id }).exec()
        res.json(user)
    } catch (e) {
        next(e)
    }
})

// update user
// maybe cut this for sake of time
router.put('/:id', (req, res) => {
    const user_id = req.params.id
    res.json({ id: user_id })
})

export default router
