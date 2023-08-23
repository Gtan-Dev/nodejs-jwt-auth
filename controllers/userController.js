// import User model
const User = require('../models/user');
// import bcrypt
const bcrypt = require('bcrypt');


class UserController {

    async index(req, res) {
        const users = await User.find();
        res.json(users);
    }

    async create(req, res) {
        const {
            name,
            email,
            password
        } = req.body;

        try {
            const user = await User.create({
                name,
                email,
                password: await bcrypt.hash(password, 10)
            });
            return res.json(user);
        } catch (err) {
            // check if email already exists
            if (err.code === 11000)
                return res.status(400).send({
                    error: 'Email already exists'
                });

            return res.status(400).send({
                error: 'Registration failed'
            });
        }
    }

}

module.exports = new UserController();