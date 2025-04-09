// создать модель события (название '', описание {}, тип '', время (date), продолжительность (сек number), фото (от 0 до 5), адрес строка, review [пустой], user_id (id тип id), )

const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { type } = require('../config.js');

const EventSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: [true, "user id is required"],
    },

    title: {
        type: String,
        required: [true, 'title is required'],
    },
    description: {
        type: String,
        required: [true, 'description is required'],
    },
    type: {
        type: String,
        enum: { values: type, message: '{VALUE} is not supported' },
        required: [true, 'type is required'],
    },
    date: {
        type: Date,        
        required: [true, 'date is required'],
    },
    duration: {
        type: Number,
        required: false,
    },
    price: {
        type: Number,
        min: 0,
        max: 1000000,
        default: 0,
    },
    images: {
        type: [String],
        required: true,
        validate: {
            validator: function (v) {
                return Array.isArray(v) && v.length >= 0 && v.length <= 5;
            },
            message:
                "The length of images array must be between 0 and 5 items.",
        },
    },
    location: {
        type: {
            latitude: {
                type: Number,
                required: true,
                min: -90,
                max: 90,
                validate: {
                    validator: function(value) {
                        return Number.isFinite(value)
                    },
                    message: '{VALUE} is not a valid latitude'
                }
            }, 
            longitude: {
                type: Number,
                required: true,
                min: -180,
                max: 180,
                validate: {
                    validator: function(value) {
                        return Number.isFinite(value)
                    },
                    message: '{VALUE} is not a valid longitude'
                }
            },
            accurancy: {
                type: Number,
                min: 0,
                validate: {
                    validator: function(value) {
                        return Number.isFinite(value)
                    },
                    message: '{VALUE} is not a valid accurancy'
                }
            },
            timestamp: {
                type: Number,
                default: Date.now
            }
        },
        _id: false,
        required: true,
        index: '2dsphere',
    },
    reviews: {
        type: [String],
        default: [],
    },

})

const Event = model('Event', EventSchema);

const eventValidation = Joi.object({

    user_id: Joi.string().required(),
    title: Joi.string().alphanum().min(3).max(24).required(),
    description: Joi.string().alphanum().min(3).max(256).pattern(new RegExp('^[a-zA-Z0-9\!\?\@\$\_\/\=\+\-\.\,\"\']$')).required(),
    type: Joi.string().required(),
    date: Joi.date().required(),
    duration: Joi.number().min(10).max(30*24*60*60),
    price: Joi.number().min(0).max(1000000).required(),
    images: Joi.array().items(Joi.string()).required(),
    location: Joi.object({
        latitude: Joi.number().min(-90).max(90).required(),
        longitude: Joi.number().min(-180).max(180).required(),
        accurancy: Joi.number().min(0).required(),
        timestamp: Joi.number().required(),
    }),
    reviews: Joi.array().items(Joi.string()),
})

module.exports = { Event, eventValidation }