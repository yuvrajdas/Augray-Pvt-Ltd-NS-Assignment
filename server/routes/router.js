const express = require('express');
const router = express.Router();
const users = require('../models/userSchema');
router.get('/', (req, res) => {
    console.log('Connected');
})

// Adding New user
router.post('/add-data', async (req, res) => {

    // console.log(req.body);
    const { name, email, mobile, address, desc } = req.body;

    // if (!name || !email || !mobile || !address || !desc) {
    //     return res.send({ serverMsg: 'Please fill out all the field' });

    // }
    const checkUser = await users.findOne({ email });

    if (checkUser) {
        return res.send({ serverMsg: false });
    }
    try {

        let newUser = new users({
            name, email, mobile, address, desc
        })
        await newUser.save();
        // console.log(newUser);
        // console.log('addedd');
        return res.send({ serverMsg: 'User added successfully...' });

    } catch (error) {
        return res.send({ serverMsg: 'Internal Error' + error });
    }

})

// Getting users data

router.get('/get-data', async (req, res) => {

    try {
        const usersdata = await users.find();
        res.json(usersdata);

        // console.log(usersdata);
    } catch (error) {
        console.log(error);
    }
})

// Getting single user
router.get('/view-data/:id', async (req, res) => {

    try {
        console.log(req.params.id);
        const uId = req.params.id;
        const singleUser = await users.findById({ _id: uId });
        // console.log(singleUser);
        res.json(singleUser);

    } catch (error) {
        // console.log(error);
        return res.send({ serverMsg: 'Internal Error' + error });
    }
})

// Getting Editable use data
router.post('/edit-data/:id', async (req, res) => {

    try {
        console.log(req.params.id);
        const uId = req.params.id;
        const singleUser = await users.findById({ _id: uId });
        console.log(singleUser);
        res.json(singleUser);

    } catch (error) {
        return res.send({ serverMsg: 'Internal Error' + error });
        // console.log(error);
    }
})

// Updating user data

router.patch('/update-data/:id', async (req, res) => {
    try {
        let uId = req.params.id;
        // console.log(req.body, uId);
        const updatedUser = await users.findByIdAndUpdate(uId, req.body, {
            new: true
        })
        console.log(updatedUser);
        return res.send({ serverMsg: 'User Updated successfully...' });


    } catch (error) {
        return res.send({ serverMsg: 'Internal Error' + error });
    }
})

// Delete user

router.delete("/delete-data/:id", async (req, res) => {

    try {
        let dId = req.params.id;
        // console.log(dId);
        let deletedUser = await users.findByIdAndDelete(dId);
        console.log(deletedUser);
        return res.send({ serverMsg: 'User Deleted successfully...', status:true });
    } catch (error) {
        return res.send({ serverMsg: 'Internal Error' + error });
    }
})


module.exports = router;
