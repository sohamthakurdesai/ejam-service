"use strict";

const mongoose = require("mongoose");
const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
require('dotenv').config();

const JSONParser = bodyParser.json();

const port = process.env.EJAM_SERVICE_PORT || 3001
const app = express();
app.use(cors());
const index = require("./index");

app.use(index);
const server = http.createServer(app);
server.listen(port, () => console.log(`Listening on port ${port}`));

/** Models */
const Deployment = require('./model/Deployment');
const Templates = require('./model/Template');

/** Database connection through Mongoose. */
const dbUri = process.env.EJAM_DB_URI

mongoose.connect(dbUri, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.once('open', () => {
    console.log("MongoDB connection successful.");
})

/** Service to get deployment details */
app.get('/deployments', JSONParser, (request, response) => {
    Deployment.find({}, null, {sort: {createdAt: -1}},  (error, data) => {
        if(error || !data) {
            response.send({
                "status": 500,
                "error": error
            });
        } else {
            response.send({
                "status": 200,
                "data": data
            });
        }
    })
})

/** Service to add deloyment details */
app.post('/deployments', JSONParser, (request, response) => {
    new Deployment(request.body).save((error, data) => {
        if(error || !data) {
            response.send({
                "status": 500,
                "error": error
            });
        } else {
            response.send({
                "status": 200,
                "data": data
            });
        }
    });
})

/** Service to delete deloyment details */
app.delete('/deployments', JSONParser, (request, response) => {
    let _id = request.body._id;
    Deployment.deleteOne( { _id }, (error, data) => {
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
    })
})

/** Add new templates and their versions. Currently it would be used only to insert the seed data. */
app.post('/templates', JSONParser, (request, response) => {
    new Templates(request.body).save((error, data) => {
        if(error || !data) {
            response.send({
                "status": 500,
                "error": error
            });
        } else {
            response.send({
                "status": 200,
                "data": data
            });
        }
    });
})

/** get all the existing templates and their versions */
app.get('/templates', JSONParser, (request, response) => {
    Templates.find({}, (error, data) => {
        if(error || !data) {
            response.send({
                "status": 500,
                "error": error
            });
        }

        if(data.length === 0) {
            response.send({
                "status": 200,
                "message": "No templates found."
            });
        } else {
            response.send({
                "status": 200,
                "data": data
            });
        }
    })
})