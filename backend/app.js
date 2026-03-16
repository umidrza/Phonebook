const express = require('express')
const mongoose = require('mongoose')
const peopleRouter = require('./controllers/people')
const morgan = require('morgan')
const middleware = require('./utils/middleware')
const config = require('./utils/config')

const app = express()

mongoose.connect(config.MONGODB_URI, { family: 4 })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })

app.use(express.static('dist'))
app.use(express.json())

morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use('/api/people', peopleRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app