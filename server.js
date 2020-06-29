"use strict";

const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require('body-parser')
const http = require('http');

const JSONParser = bodyParser.json()

const port = process.env.EJAM_SERVICE_PORT || 3001
const app = express();
const index = require("./index");

app.use(index)
const server = http.createServer(app);
server.listen(port, () => console.log(`Listening on port ${port}`))

/** Models */
const Deployment = require('./model/Deployment');
const Templates = require('./model/Templates');

/** Database connection through Mongoose. */
const dbUri = process.env.EJAM_DB_URI
mongoose.connect(dbUri, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.once('open', () => {
    console.log("MongoDB connection successful.");
})

/** Service to get deployment details */
app.get('/getdeployment', JSONParser, (request, response) => {
    Deployment.find({}, (error, data) => {
        if(error || !data) {
            response.send({
                "status": 500,
                "error": error
            })
        }

        if(data.length === 0) {
            response.send({
                "status": 200,
                "message": "No deployments found."
            })
        } else {
            response.send({
                "status": 200,
                "data": data
            })
        }
    })
})

/** Service to add deloyment details */
app.post('/adddeployment', JSONParser, (request, response) => {
    try {
        // Deployment.create()
    } catch (error) {
        response.send(error)
    }
})

/** Service to add deloyment details */
app.post('/deletedeployment', JSONParser, (request, response) => {
    try {
        // Deployment.create()
    } catch (error) {
        response.send(error)
    }
})

/** Add new templates and their versions. Currently it would be used only to insert the seed data. */
app.post('/createtemplates', JSONParser, (request, response) => {
    new Templates(request.body).save((error, data) => {
        if(error || !data) {
            response.send({
                "status": 500,
                "error": error
            })
        } else {
            response.send({
                "status": 200,
                "data": data
            })
        }
    });
})

/** get all the existing templates and their versions */
app.get('/getalltemplates', JSONParser, (request, response) => {
    Templates.find({}, (error, data) => {
        if(error || !data) {
            response.send({
                "status": 500,
                "error": error
            })
        }

        if(data.length === 0) {
            response.send({
                "status": 200,
                "message": "No templates found."
            })
        } else {
            response.send({
                "status": 200,
                "data": data
            })
        }
    })
})