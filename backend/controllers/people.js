const peopleRouter = require('express').Router()
const Person = require('../models/person')

peopleRouter.get('/', (request, response, next) => {
    Person.find({})
        .then(people => {
            response.json(people)
        })
        .catch(error => next(error))
})

peopleRouter.get('/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

peopleRouter.post('/', (request, response, next) => {
    const { name, number } = request.body
    const person = new Person({ name, number })

    person.save()
        .then(savedPerson => {
            response.status(201).json(savedPerson)
        })
        .catch(error => next(error))
})

peopleRouter.put('/:id', (request, response, next) => {
    const { name, number } = request.body
    const person = { name, number }

    Person.findByIdAndUpdate(
        request.params.id,
        person,
        { returnDocument: 'after', runValidators: true, context: 'query' }
    )
        .then(updatedPerson => {
            if (!updatedPerson) {
                return response.status(404).end()
            }
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})

peopleRouter.delete('/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

module.exports = peopleRouter