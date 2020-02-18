"use strict";
const express = require('express')
const app = express()
const path = require("path");
const cors = require("cors");
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
dotenv.config();
const jsonfile = require('jsonfile')

const store = 'C:\\Users\\Developers\\Desktop\\NodeJS\\server\\store.json'

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/gettodos', (req, res) => {
    try {
        jsonfile.readFile(store, (err, obj) => {
            if (err) console.log("json read error => ", err)
            res.status(200).send(obj);
        })
    } catch (error) {
        res.status(400).send(error)
    }
})

app.post('/addtodo', (req, res) => {
    try {
        var todo = res.req.body.todo;
        jsonfile.readFile(store, (err, obj) => {
            if (err) console.log("json read error => ", err)
            obj.todos.push(todo)
            var augObj = { 
                todos: obj.todos
            };
            jsonfile.writeFile(store, augObj, (err) => {
                if (err) console.error(err)
                res.status(201).send({ message: "the todo was added!" })
            })
        })
    } catch (error) {
        console.log("error for adding a todo", error)
        res.status(400).send(error)
    }
})

app.listen(process.env.SERVER_PORT, () => console.log(`Example app listening on port ${process.env.SERVER_PORT}!`))