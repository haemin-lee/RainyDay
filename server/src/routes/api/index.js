import express from 'express'
import users from './users'

let router = express.Router()

router.use('/users', users)

export default router
