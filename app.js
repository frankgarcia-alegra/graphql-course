require('dotenv').config();
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
const schema = require('./schema')

const app = express();
const PORT = 4000;

mongoose.connect(process.env.MONGO_URL)

app.use(cors());

app.use('/', graphqlHTTP({
	graphiql: true,
	schema
}))

mongoose.connection.once("open", () => {
	console.log("App connected to database");
})

app.listen(PORT, () => {
	console.log("Listening on port " + PORT);
})
