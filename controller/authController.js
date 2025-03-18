const { User, primaryValidation, extendedValidation } = require("../models/User.js");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secret } = require("../config.js");

const generateAccessToken = (id) => {
    const payload = {
        id,
    };
    return jwt.sign(payload, secret, { expiresIn: "100h" });
};

class authController {
    async getUser(req, res) {
        try {
            const user = await User.findById(req.user.id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.status(200).json(user);
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async signup(req, res) {
        try {
            const { email, password, role } = req.body;

            const { error } = primaryValidation.validate( req.body );

            if (error) {
                return res
                    .status(400)
                    .json({ message: error.details[0].message });
            }

            

            const hashPassword = bcrypt.hashSync(password, 7);
            const existedUser = await User.findOne({ email });

            if (!existedUser) {
                const user = new User({ email, password: hashPassword, role });
                await user.save();
                const token = generateAccessToken(user._id);
                return res.json({ token, user });
            }

            console.log("User with specified email already exists");
            return res
                .status(404)
                .json({ message: "User with specified email already exists" });
        } catch (e) {
            console.log(e); // на сервер
            return res.status(500).json({ message: "Internal server error" }); // на клиент
        }
    }

    async signin(req, res) {
        try {
            const { email, password } = req.body;
            let user = await User.findOne({ email });

            if (!user) {
                return res
                    .status(404)
                    .json({ message: `Email ${email} couldnt be found` });
            }

            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({ message: `Invalid password` });
            }

            const token = generateAccessToken(user._id);
            return res.json({ token, user });
        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async userUpdate(req, res) {
        try {

            

            const { error } = extendedValidation.validate(req.body);
            if (error) {
                return res
                    .status(400)
                    .json({ message: error.details[0].message });
            }


            const { id } = req.user; // id из middleware
            if (!id || !mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).send({ message: "Invalid User ID" });
            }
            const existedUser = await User.findById(id);
            if (!existedUser) {
                return res.status(404).send({ message: "User not found" });
            }

            console.log(req.body)
            const user = await User.findByIdAndUpdate(
                id,
                { ...req.body, status: true },
                { new: true }
            );
            await user.save();
            return res.status(200).send(user);
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
}

module.exports = new authController();


