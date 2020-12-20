import express from 'express'
import users from './users'
import sheets from './sheets'
import analyze from './analyze'
import translate from './translate'
import loans from './loans'

let router = express.Router()

router.use('/users', users)
router.use('/sheets', sheets)
router.use('/analyze', analyze)
router.use('/translate', translate)
router.use('/loans', loans)

export default router
