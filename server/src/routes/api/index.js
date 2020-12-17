import express from 'express'
import users from './users'
import sheets from './sheets'
import analyze from './analyze'

let router = express.Router()

router.use('/users', users)
router.use('/sheets', sheets)
router.use('/analyze', analyze)

export default router
