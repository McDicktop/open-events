const { Schema, model } = require('mongoose');
const Joi = require("joi");

const { preferences } = require("../config.js");
const tags = Object.values(preferences).flat();


const UserSchema = new Schema({
    role: {
        type: String,
        default: 'user',
        enum: { values: ['user', 'creator'], message: '{VALUE} is not supported' }
    },

    firstname: {
        type: String,
        default: 'firstname',
    },

    lastname: {
        type: String,
        default: 'lastname',
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
    },

    dateOfBirth: {
        type: Number,
        min: Date.now() - 100*365*24*60*60*1000, // 100 лет
        max: Date.now() - 10*365*24*60*60*1000,  // 10 лет
        default: 0,
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
    },

    avatar: {
        type: String,
        default: 'url...',
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

const primaryValidation = Joi.object({
    role: Joi.string().valid('user','creator').required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(64).required(),
});

const extendedValidation = Joi.object({
    firstname: Joi.string().alphanum().min(3).max(30),    
    lastname: Joi.string().alphanum().min(3).max(30),
    dateOfBirth: Joi.number(),
    address: Joi.object({
        country: Joi.string(),
        city: Joi.string(),
        street: Joi.string(),
    }),
    avatar: Joi.string(),
    preferences: Joi.array().items(Joi.string()),    
    likes: Joi.array().items(Joi.string()),
    friends: Joi.array().items(Joi.string()),
    events: Joi.array().items(Joi.string()),    
})


module.exports = {
    User,
    primaryValidation,
    extendedValidation,
};

