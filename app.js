require('dotenv').config();
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const mongoose = require('mongoose');
const schema = require('./schema/schema')

const app = express();
const PORT = process.env.PORT || 4000;
const CONNECTION_STRING = process.env.CONNECTION_STRING;

app.use(cors());

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema
}));

mongoose.connect(CONNECTION_STRING)
    .then(() => {
        app.listen(PORT, () => {
            console.log('Listening on port 4000');
        })
    }).catch((error) => console.log('The following error has occurred: ' + error));