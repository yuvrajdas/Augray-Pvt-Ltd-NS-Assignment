const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        mobile: {
            type: Number,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            required: true
        },
    },
    {
        collection: 'users'
    }
)

const users = new mongoose.model("users", usersSchema);
module.exports = users;