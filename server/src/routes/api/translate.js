import express from 'express'
import config from '@app/config'
import t from '@google-cloud/translate'

const { Translate } = t.v2

const projectId = config.projectId

const translate = new Translate({ projectId })

let router = express.Router()

router.post('/', async (req, res, next) => {
    try {
        const text = req.body.text
        const language = req.body.language

        const [translation] = await translate.translate(text, language)
        res.json({
            text: translation,
        })
    } catch (e) {
        next(e)
    }
})

export default router
