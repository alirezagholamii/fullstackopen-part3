const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.o80gm.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    id: Number,
})

const Person = mongoose.model('Person', personSchema)
const generateId = () => Math.floor(Math.random() * 100000);

const showPhonebook = () => {
    console.log('phonebook:');
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name + ' ' + person.number)
        })
        mongoose.connection.close()
    })
}

const addPerson = (name, number) => {
    const person = new Person({
        name,
        number,
        id: generateId(),
    })

    person.save().then(result => {
        console.log('person saved!')
        mongoose.connection.close()
    })
}



if (process.argv.length === 3) {
    showPhonebook()
}

if (process.argv.length === 5) {
    const name = process.argv[3]
    const number = process.argv[4]
    addPerson(name, number)
}







