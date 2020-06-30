This is a nodejs, express, mongoose project.

## Prerequisites

1. A mongodb v >= 4.0 should be installed.
2. Create database "deploymentdb".
3. Create database user using following command:

    db.createUser( { user: <username>, pwd: <password>, roles: [ { role: "dbOwner", db: "deploymentdb" } ],mechanisms:["SCRAM-SHA-1"] } )

4. Environment variables should be set in .env file. Refer .env-example file.

## Available Scripts

To install dependencies run following command in the project directory:
### `npm install`

To run the application invoke following command in the project directory:
### `npm start`

3001 is the default port. If another port is not specified in the environment variable then the application would run on [http://localhost:3001](http://localhost:3001).
On the above url application's endpoints can be accessed.
Those APIs are consumed by the UI application- ejam-ui.