const { Schema, model } = require('mongoose');
const Joi = require("joi");

const ReviewSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: [true, "user id is required"],
    },

    rating: {
        type: Number,
        min: 1,
        max: 5,        
        required: [true, "rating is is required"],
    },

    description: {
        type: String,
        required: [true, "description is is required"],
    },

    images: {
        type: [String],
        validate: {
            validator: function (v) {
                return Array.isArray(v) && v.length >= 0 && v.length <= 5;
            },
            message:
                "The length of images array must be between 0 and 5 items.",
        },
        default: [],
    }, 

});

const Review = model("Review", ReviewSchema);

const reviewValidation = Joi.object({
    user_id: Joi.string().required(),
    rating: Joi.number().min(1).max(5).required(),
    description: Joi.string().min(3).max(256).required(),
    images: Joi.array().items(Joi.string()),
});

module.exports = {
    Review,
    reviewValidation,
};

