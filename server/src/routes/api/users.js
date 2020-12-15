import express from 'express'

let router = express.Router()

// CRUD
// create new user
router.post('/', (req, res) => {
    res.json({ message: 'hello world' })
})

// get user
router.get('/:id', (req, res) => {
    const user_id = req.params.id
    res.json({ id: user_id })
})

// update user
// maybe cut this for sake of time
router.put('/:id', (req, res) => {
    const user_id = req.params.id
    res.json({ id: user_id })
})

export default router
