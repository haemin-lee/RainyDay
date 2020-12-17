import express from 'express'
import users from './users'
import sheets from './sheets'

let router = express.Router()

router.use('/users', users)
router.use('/sheets', sheets)

export default router
