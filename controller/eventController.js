const { Event } = require("../models/Event.js");
const { User } = require("../models/User.js");
const mongoose = require("mongoose");

const multer = require("multer");

const { allowedTypes } = require("../config.js");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "cache/images/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    },
});

const upload = multer({ storage });

class eventController {
    async toggleLike(req, res) {
        try {
            const { eventId } = req.body;

            if (!mongoose.Types.ObjectId.isValid(eventId)) {
                return res.status(400).json({ message: "Invalid event id" });
            }

            const event = await Event.findById(eventId);
            if (!event) {
                return res.status(400).json({ message: "Event not found" });
            }

            const { id } = req.user;

            if (event.user_id.toString() === id) {
                return res
                    .status(406)
                    .json({ message: "Prohibited adding his own event" });
            }

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: "Invalid user id" });
            }

            const user = await User.findById(id);
            if (!user) {
                return res.status(400).json({ message: "User not found" });
            }

            const hasEvent = user.likes.find((id) => id === eventId);

            if (!hasEvent) {
                const updatedUser = await User.findByIdAndUpdate(
                    id,
                    {
                        $push: { likes: eventId },
                        $set: { updatedAt: new Date() },
                    },
                    { new: true }
                ).select("-password");

                return res.status(200).send(updatedUser);
            }

            const updatedUser = await User.findByIdAndUpdate(
                id,
                {
                    $pull: { likes: eventId },
                    $set: { updatedAt: new Date() },
                },
                { new: true }
            ).select("-password");

            return res.status(200).send(updatedUser);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async getEvents(req, res) {
        try {

            const query = {};

            if (req.query.string && req.query.string.length < 32) {
                query["$or"] = [
                    {
                        title: {
                            $regex: req.query.string,
                            $options: "i",
                        },
                    },
                    {
                        description: {
                            $regex: req.query.string,
                            $options: "i",
                        },
                    },
                ];
            }

            if (req.query.types) {
                const requestedTypes = req.query.types.split("+");

                const validTypes = requestedTypes.filter((type) =>
                    allowedTypes.includes(type)
                );

                if (validTypes.length > 0) {
                    query.type = { $in: validTypes }
                }
            }
            
            if (
                req.query.price?.min &&
                req.query.price?.max &&
                +req.query.price?.min >= 0 &&
                +req.query.price?.max <= 1000000 &&
                +req.query.price.min < +req.query.price.max
            ) {
                query.price = {
                    '$gte':  +req.query.price.min,
                    '$lte':  +req.query.price.max,
                }
            }

            if (
                req.query.date?.min &&
                req.query.date?.max &&
                +req.query.date.min > Date.now() &&
                +req.query.date.min < +req.query.date.max
            ) {
                query.date = {
                    '$gte':  +req.query.date.min,
                    '$lte':  +req.query.date.max,
                }
            }

            if (
                req.query.duration &&
                +req.query.duration >= 0 &&
                +req.query.duration <= 2
            ) {
                switch (req.query.duration) {
                    case 0: {
                        query.duration = { $lte: 1000 };
                        break;
                    }
                    case 1: {
                        query.duration = { $gte: 1000, $lte: 10000 };
                        break;
                    }
                    default: {
                        query.duration = { $gte: 10000 };
                    }
                }
            }

            // console.log(query);
            const events = await Event.find(query);
            return res.status(200).json(events);
        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async getUserEvents(req, res) {
        // возвращает все события пользователя по id
        try {
            const { id } = req.params;
            if (!id || !mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).send({ message: "Invalid user ID!" });
            }
            const events = await Event.find({ user_id: id });
            return res.status(200).json(events);
        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    async addEvent(req, res) {
        try {
            const { id } = req.user;
            const owner = await User.findById(id);
            if (!owner) {
                return res
                    .status(404)
                    .json({ message: "Event organizer not found" });
            }
            if (!owner.status || owner.role !== "creator") {
                return res.status(406).json({
                    message:
                        "This user type does not have permission to create events",
                });
            }
            const body = JSON.parse({ ...req.body }.content);

            // body validation

            const images = await req.files.map(
                (el) => `http://localhost:8080/cache/images/${el.filename}`
            );
            const event = new Event({ ...body, user_id: id, images });
            await event.save();
            return res.status(200).json(event);
        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    async editEvent(req, res) {
        const { id: event_id } = req.params;
        if (!event_id || !mongoose.Types.ObjectId.isValid(event_id)) {
            return res.status(400).send({ message: "Invalid Event ID!" });
        }
        try {
            // проверка пользователя
            const { id } = req.user; // id из middleware
            if (!id || !mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).send({ message: "Invalid User ID" });
            }

            const owner = await User.findById(id);
            if (!owner) {
                return res.status(404).send({ message: "User not found" });
            }

            if (!owner.status || owner.role !== "creator") {
                return res.status(406).json({
                    message:
                        "This user type does not have permission to edit any events",
                });
            }

            const existingEvent = await Event.findById(event_id);
            if (!existingEvent) {
                return res.status(404).json({ message: "Event not found" });
            }

            if (!req.body || Object.keys(req.body).length === 0) {
                return res
                    .status(400)
                    .json({ message: "No data provided for update" });
            }

            const updatedEvent = await Event.findByIdAndUpdate(
                event_id,
                { $set: req.body },
                { new: true, runValidators: true }
            );

            return res.status(200).json(updatedEvent);
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async deleteEvent(req, res) {
        const { id } = req.params;
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send({ message: "Invalid Event ID!" });
        }
        try {
            const deletedEvent = await Event.findByIdAndDelete(id);
            if (!deletedEvent) {
                return res.status(404).send({ message: "Event not found!" });
            }
            return res.json(deletedEvent);
        } catch (e) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

module.exports = {
    upload,
    controller: new eventController(),
};
