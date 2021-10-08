'use strict'
const express = require('express')
const app = express()
app.use(express.json())

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/info', (request, response) => {
    const date = new Date().toString()
    response.send(`
    <div>
    <h2>Phonebook has info for ${persons.length} people</h2>
    <h2>${date}</h2>
    </div>
    `)
})

app.get('/api/persons/:id', (request, response) => {
    const id = +request.params.id
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = +request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})


app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }
    if (isDuplicateName(body.name)) {
        return response.status(400).json({
            error: 'The name already exists in the phonebook'
        })
    }

    const person = {
        number: body.number,
        name: body.name,
        id: generateId(),
    }

    persons = persons.concat(person)
    response.json(person)
})

const generateId = () => Math.floor(Math.random() * 100000);
const isDuplicateName = (name) => {
    return persons.some((person) => person.name === name)
}


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})