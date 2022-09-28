require('dotenv').config
const express = require("express")
const bodyParser = require('body-parser')
const mysql = require('mysql')
const app = express()
const PORT = 3000


app.use(bodyParser.json())

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    port: process.env.DATABASE_PORT,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
})

connection.connect()

const users = [
    {
        id: 1,
        firstname: "ramon",
        othername: "idiagbon",
        occupation:"banker",
        age:"35"
    },
    {
        id: 2,
        firstname: "basmah",
        othername: "adebisi",
        occupation:"ustazah",
        age:"30"
    },
    {
        id: 3,
        firstname: "segun",
        othername: "odunsanya",
        occupation:"teacher",
        age:"57"
    },
    {
        id: 4,
        firstname: "stanley",
        othername: "thompson",
        occupation:"doctor",
        age:"40"
    },
]

// get all customers
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})



app.get('/adebisi', (req,res) => {
    res.send("welcome to adebisi")
    })

app.post('/customer',(req,res) => {
    const fname = req.body.firstname
    const oname = req.body.othername
    const lname = req.body.lastname
    const age = req.body.age

    if(!fname || !oname || !lname || !age){
        res.status(400).send({
            message: 'all fields are required'
        })
    }else if(age < 18){
        res.status(400).send({
            message: 'try againg next time. you cant register if you are not 18 and above'
        })
    }else {
        const newUser = {
            id: users.length + 1,
            firstname: fname,
            othername: oname,
            age: age   
        }
        users.push(newUser)
            res.status(201).send({
                message: 'succesfully created',
                data: newUser
            })
        }
})
        // going to create a new user
    



// app.post(`/adebisi`,(req,res) => {
//     const data = req.body
//     console.log(data)
//     if (data.firstname == "" || data.lastname == "" || data.email == ""){
//         res.send({
//             message:"all fields are required",
//         })
//     }
//     else{
//         res.send({
//             message:"user successfully created",
//         })
//     }
// })
