const mongoose = require('mongoose')

const phoneValidator = (phone) => {
    const parts = phone.split('-')

    if (parts.length !== 2) return false

    const [first, second] = parts

    const firstValid = /^\d{2,3}$/.test(first)
    const secondValid = /^\d+$/.test(second)

    return firstValid && secondValid && phone.length >= 8
}

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    number: {
        type: String,
        required: true,
        validate: {
            validator: phoneValidator,
            message: props => `${props.value} is not a valid phone number!`
        }
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)
