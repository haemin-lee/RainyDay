import express from 'express'
import mongoose from 'mongoose'
import path from 'path'

import config from '@app/config'

import oauth from '@app/routes/oauth'
import api from '@app/routes/api'

const PORT = config.PORT || 3000

const app = express()

app.use(express.json())

// set up mongodb
mongoose.connect(config.db_connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// Handle OAuth
app.use('/oauth', oauth)

// Run all routes through /api to avoid React pathing conflicts
app.use('/api', api)

if (config.NODE_ENV === 'production') {
    // Serve React production bundle
    app.use(express.static(path.join(__dirname, 'build')))
    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, 'build', 'index.html'))
    })
} else {
    app.get('/', (req, res) => {
        return res.json({ message: 'hello world!' })
    })
}

app.listen(PORT, () => {
    console.log(`Process is running on port ${PORT}`)
})
