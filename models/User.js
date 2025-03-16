const { Schema, model } = require('mongoose');
const Joi = require("joi");

const { preferences } = require("../config.js");
const tags = Object.values(preferences).flat();


const UserSchema = new Schema({
    role: {
        type: String,
        required: [true, 'role is required'],
        default: 'user',
        enum: { values: ['user', 'creator'], message: '{VALUE} is not supported' }
    },

    firstname: {
        type: String,
        default: 'firstname',
        required: [true, "firstname is required"],
    },

    lastname: {
        type: String,
        default: 'lastname',
        required: [true, "lastname is required "],
    },

    email: {
        type: String,
        unique: true,
        required: [true, "email is required"],
    },

    password: {
        type: String,
        required: [true, "password is required"],
    },

    status: {
        type: Boolean,
        default: false,
        required: [true, "status is required"],
    },

    dateOfBirth: {
        type: Number,
        min: Date.now() - 100*365*24*60*60*1000, // 100 лет
        max: Date.now() - 10*365*24*60*60*1000,  // 10 лет
        default: 0,
        required: [true, "date of birth is required"],
    },

    address: {
        type: {
            country: {
                type: String,
                default: '',
            },
            city: {
                type: String,
                default: '',
            },
            street: {
                type: String,
                default: '',
            },
        },
        default: {},
        required: [true, "address is required"],
    },

    avatar: {
        type: String,
        default: 'url',
        required: [true, "avatar is required"],
    },

    preferences: { // tags
        type: [String],
        enum: { values: tags, message: '{VALUE} is not supported' },
        default: [],
    },

    likes: {
        type: [String],
        default: [],
    },

    friends: {
        type: [String],
        default: [],
    },

    events: {
        type: [String],
        default: [],
    },

});

const User = model("User", UserSchema);

const userValidation = Joi.object({
    role: Joi.string().required(),
    // firstname: Joi.string().required(),
    firstname: Joi.string().alphanum().min(3).max(30).required(),
    
    lastname: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    // password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9!?@$_]{6,12}$')).required(), // ?????
    password: Joi.string().min(8).max(64).required(), 
    status: Joi.boolean().required(),
    dateOfBirth: Joi.number().required(),
    address: Joi.object({
        county: Joi.string().required(),
        city: Joi.string().required(),
        street: Joi.string().required(),
    }),
    avatar: Joi.string().required(),
    preferences: Joi.array().items(Joi.string()),    
    likes: Joi.array().items(Joi.string()),
    friends: Joi.array().items(Joi.string()),
    events: Joi.array().items(Joi.string()),
});

module.exports = {
    User,
    userValidation,
};

