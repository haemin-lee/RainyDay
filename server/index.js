import express from 'express'
import path from 'path'

import oauth from '@app/routes/oauth'
import config from '@app/config'

const PORT = config.PORT || 3000

const app = express()

app.use(express.json())

// Handle OAuth
app.use('/oauth', oauth)

// Run all routes through /api to avoid React pathing conflicts

if (config.NODE_ENV === 'production') {
    // Serve React production bundle
    app.use(express.static(path.join(__dirname, 'build')))
    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, 'build', 'index.html'))
    })
} else {
    app.get('/', (req, res) => {
        res.json({ message: 'hello world!' })
    })
}

app.listen(PORT, () => {
    console.log(`Process is running on port ${PORT}`)
})
