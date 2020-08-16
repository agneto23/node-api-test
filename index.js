const express = require('express')
const Sequelize = require('sequelize')

const app = express()
const sequelize = new Sequelize('postgres://postgres:admin@localhost:5432/postgres')

const cors = require('cors')

app.use(cors())

const port = 3000

app.use(express.json());

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

const User = sequelize.define('user', {

// attributes

    firstName: {

        type: Sequelize.STRING,

        allowNull: false

    },

    lastName: {

        type: Sequelize.STRING

// allowNull defaults to true

    }

}, {

// options

});

// Note: using `force: true` will drop the table if it already exists

User.sync({ force: true }) // Now the `users` table in the database corresponds to the model definition

app.get('/', (req, res) => res.json({message: 'Hello World'}))

app.post('/createUser', async (req, res) => {

    try {

        const newUser = new User(req.body)

        await newUser.save()

        res.json({ user: newUser }) // Returns the new user that is created in the database

    } catch(error) {

        console.error(error)
        res.end("error");

    }

})

app.get('/user/:userId', async (req, res) => {

    const userId = req.params.userId

    try {
        const user = await User.findAll({
                where: {
                    id: userId
                }
            }
        )
        res.json({ user })

    } catch(error) {
        console.error(error)
        res.end("error");
    }

})

app.get('/users', async (req, res) => {

    const userId = req.params.userId

    try {
        const user = await User.findAll()
        res.json({ user })

    } catch(error) {
        console.error(error)
        res.end("error");
    }

})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))