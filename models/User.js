const { Schema, model } = require('mongoose');
const Joi = require("joi");

const UserSchema = new Schema({
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

    preferences: {
        type: [String],
        default: [],
        required: [true, "preferences are required"],
    },

    events: {
        type: [{
            id: {
                type: String,
            },
            status: {
                type: Boolean,
            },
        }],
        default: [],
        required: [true, "events are required"],
    },

    likes: {
        type: [String],
        default: [],
        required: [true, "likes are required"],
    },

    friends: {
        type: [{
            id: {
                type: String,                
            },
            dateOfBirth: {
                type: Number,
            }
        }],
        default: [],
        required: [true, "friends are required"],
    },

    // events: [
    //     {
    //         name: ,
    //         date: ,
    //         price: ,
    //         id: ,
    //         status: 'или был на мероприятии или нет'
    //     }
    // ],
    // likes: [
    //     'id', 'id', 'id'
    // ],
    // friends: [
    //     {
    //         id,
    //         dateOfAdding:
    //     }
    // ],

});

const User = model("User", UserSchema);

const userValidation = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9!?-_]{6,12}$')).required(), // ?????
    status: Joi.boolean().required(),
    dateOfBirth: Joi.number().required(),
    address: Joi.object({
        county: Joi.string().required(),
        city: Joi.string().required(),
        street: Joi.string().required(),
    }),
    avatar: Joi.string().required(),
    preferences: Joi.array().items(Joi.string()).required(),
    events: Joi.array().items(Joi.object({
        id: Joi.string(),
        status: Joi.boolean(),
    })).required(),
    likes: Joi.array().items(Joi.string()).required(),
    friends: Joi.array().items(Joi.object({
        id: Joi.string(),
        dateOfBirth: Joi.number(),
    })).required(),
 
});

module.exports = {
    User,
    userValidation,
};