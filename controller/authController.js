const {
    User,
    primaryValidation,
    extendedValidation,
} = require("../models/User.js");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secret } = require("../config.js");

const generateAccessToken = (id) => {
    return jwt.sign({ id }, secret, { expiresIn: "100h" });
};

const handleError = (res, error, message = "Internal server error") => {
    console.error(error);
    return res.status(500).json({ message });
};

class authController {
    async getUser(req, res) {
        try {
            const user = await User.findById(req.user.id).select("-password");

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            return res.status(200).json(user);
        } catch (e) {
            return handleError(res, error);
        }
    }

    async signup(req, res) {
        try {
            const { email, password, role } = req.body;

            const { error } = primaryValidation.validate(req.body);
            if (error) {
                return res
                    .status(400)
                    .json({ message: error.details[0].message });
            }

            const existedUser = await User.findOne({ email });
            if (existedUser) {
                return res
                    .status(409)
                    .json({
                        message: "User with specified email already exist",
                    });
            }

            const hashPassword = await bcrypt.hash(password, 10);
            const user = new User({
                email,
                password: hashPassword,
                role,
                createdAt: new Date(),
            });

            await user.save();
            const token = generateAccessToken(user._id);
            const userData = user.toObject();
            delete userData.password;

            return res.status(201).json({ token, user: userData });
        } catch (e) {
            return handleError(res, error);
        }
    }

    async signin(req, res) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });
            if (!user) {
                return res
                    .status(404)
                    .json({ message: `User with email ${email} not found` });
            }

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(400).json({ message: `Invalid password` });
            }

            const token = generateAccessToken(user._id);
            const userData = user.toObject();
            delete userData.password;

            return res.json({ token, user: userData });
        } catch (e) {
            return handleError(res, error);
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

            const { id } = req.user;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).send({ message: "Invalid User ID" });
            }

            const existedUser = await User.findById(id);
            if (!existedUser) {
                return res.status(404).send({ message: "User not found" });
            }

            if (req.body.password) {
                req.body.password = await bcrypt.hash(password, 10);
            }

            const updatedUser = await User.findByIdAndUpdate(
                id,
                { $set: { ...req.body, status: true, updatedAt: new Date() } },
                { new: true, runValidators: true }
            ).select("-password");

            return res.status(200).send(updatedUser);
        } catch (e) {
            return handleError(res, error);
        }
    }

    // async patchUser(req, res) {
    //     try {
    //         const { id } = req.user;

    //         if (!mongoose.Types.ObjectId.isValid(id)) {
    //             return res.status(400).json({ message: "Invalid User ID" });
    //         }

    //         const existedUser = await User.findById(id);
    //         if (!existedUser) {
    //             return res.status(404).json({ message: "User not found" });
    //         }

    //         const { preferences, likes, friends, events } = req.body;
    //         const updatedFields = {};

    //         if (preferences) updatedFields.preferences = preferences;
    //         if (likes) updatedFields.likes = likes;
    //         if (friends) updatedFields.friends = friends;
    //         if (events) updatedFields.events = events;

    //         const validForPush =
    //             Object.keys(updatedFields).length === 1 &&
    //             typeof Object.values(updatedFields)[0] === "string";

    //         if (!validForPush) {
    //             return res.status(400).json({message: 'Invalid data for patch operation. Only one field with string value is allowed'})
    //         }

	// 		const updatedUser = await User.findByIdAndUpdate(
	// 			id,
	// 			{
	// 				$push: updatedFields,
	// 				$set: {updatedAt: new Date()}
	// 			},
	// 			{ new: true }
	// 		).select('-password');
	// 		return res.status(200).send(updatedUser);
    //     } catch (error) {
    //         return handleError(res, error)
    //     }
    // }
}

module.exports = new authController();
