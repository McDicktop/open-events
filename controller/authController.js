const { User } = require("../models/User.js");
const { Executor } = require("../models/Executor.js");
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
    // Когда отправляется запрос на регистрацию, то делаем проверку на тип пользователя (user, executor). От этого вызываются разные модели

    // Для регистрации будет 2 запроса,
    // 1 - регистрация пользхователя без данных (только почта, тип пользователя и пароль)
    // 2 - дополнение пользовательских данных


    async getUserById(req, res) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                return res.status(403).json({ message: 'Token not transferred' })
            }

            const { id } = jwt.verify(token, secret);

            if (!id) {
                return res.status(403).json({ message: 'Error verifying token' })
            }

            let user = await User.findById(id);

            if (!user) {
                user = await Executor.findById(id);
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
            }

            return res.status(200).json(user);
        } catch (e) {
            console.error('Error verifying token: ', e);
            return e;
        }
    }


    async signup(req, res) {
        try {
            const { email, password, role } = req.body;

            // if(!valid(email, password)) throw new Error('Validation email/password error');

            if (role !== 'user' && role !== 'executor') {
                throw new Error(
                    "User role is invalid"
                );
            }

            const hashPassword = bcrypt.hashSync(password, 7);
            const existedUser = await User.findOne({ email });
            const existedExecutor = await Executor.findOne({ email });

            if (existedUser || existedExecutor) {
                throw new Error(
                    "User with specified email already exists"
                );
            }

            const user = role === 'user' ? new User({ email, password: hashPassword }) : new Executor({ email, password: hashPassword });
            await user.save();
            const token = generateAccessToken(user._id);
            return res.json({ token, user });

        } catch (e) {
            console.log(e); // на сервер
            // res.status(400).json({ message: "Internal server error" }); // на клиент
            res.status(400).json({ message: e.message }); // на клиент
        }
    }

    async signin(req, res) {
        try {
            const { email, password } = req.body;
            let user = await User.findOne({ email });

            if (!user) {
                user = await Executor.findOne({ email });
                if (!user) {
                    return res.status(400).json({ message: `Email ${email} couldnt be found` })
                }
            }

            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({ message: `Invalid password` })
            }

            const token = generateAccessToken(user._id);
            return res.json({ token, user });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Login error' });
        }
    }

    async userUpdate(req, res) {
        const { id } = req.params;
        console.log(id)
        const {
            firstname,
            lastname,
            dateOfBirth,
            address,
            avatar,
            preferences,
            role,
        } = req.body;

        console.log(firstname,
            lastname,
            dateOfBirth,
            address,
            avatar,
            preferences,
            role)

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ message: "Invalid User ID" });
        }

        let isExists, user;

        try {
            switch (role) {
                case "user": {
                    isExists = await User.findById(id);
                    if (!isExists) {
                        return res
                            .status(400)
                            .send({ message: "User not found" });
                    }
                    user = await User.findByIdAndUpdate(
                        id,
                        {
                            firstname,
                            lastname,
                            dateOfBirth,
                            address,
                            avatar,
                            preferences,
                            status: true,
                        },
                        {
                            new: true,
                        }
                    );
                    await user.save();
                    break;
                }
                case "executor": {
                    isExists = await Executor.findById(id);
                    if (!isExists) {
                        return res
                            .status(400)
                            .send({ message: "User not found" });
                    }
                    user = await Executor.findByIdAndUpdate(
                        id,
                        {
                            firstname,
                            lastname,
                            dateOfBirth,
                            address,
                            avatar,
                            preferences,
                            status: true,
                        },
                        {
                            new: true,
                        }
                    );
                    await user.save();
                    break;
                }
                default: {
                    throw new Error("Unknown user role");
                }
            }
            return res.status(200).send(user);
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: "Internal server error" });
        }
    }
}

module.exports = new authController();
