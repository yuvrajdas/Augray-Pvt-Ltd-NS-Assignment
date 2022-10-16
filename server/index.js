require("dotenv").config();
const express = require('express');
const mongoose = require("mongoose");
require('./database/dbconn');
const app = express();
const cors = require('cors');
app.use(cors());
const users = require('./models/userSchema');
const port = process.env.PORT || 7000;
app.use(express.json());
const router = require('./routes/router');
app.use(router);

app.get('/', (req, res) => {
    res.json("Server activated");
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});