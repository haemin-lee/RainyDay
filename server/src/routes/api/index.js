import express from 'express'
import users from './users'
import sheets from './sheets'
import analyze from './analyze'
// import translate from './translate'

let router = express.Router()

router.use('/users', users)
router.use('/sheets', sheets)
router.use('/analyze', analyze)
// router.use('/translate', translate)

export default router
