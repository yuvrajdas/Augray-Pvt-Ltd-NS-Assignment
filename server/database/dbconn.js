const mongoose = require('mongoose');

const DB = process.env.DATABASE;

let conn = mongoose.connect(DB);
conn.then(() => {
    console.log('Database connected successfully...');
})
conn.catch((error) => {
    console.log(error);
})