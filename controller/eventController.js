const { Event } = require("../models/Event.js");
const { User } = require("../models/User.js");
const mongoose = require("mongoose");

const multer = require("multer");

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
  // маршрут для получения всех событий (добавить элементарную фильтрацию (по названию, по описанию))
  async getEvents(req, res) {
    try {
      const { title, description } = req.query;
      // if (!title && !description) {
      //   return res.status(400).json({ message: "No filter params" });
      // }

      const events = await Event.find({title: {$regex: title, $options: 'i'}, description: {$regex: description, $options: 'i'}});

      // фильтрация
      // console.log(events.filter((el) => el.title.includes(title)));


      return res.status(200).send(events);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Internal server error" });
    }
  }


  async getUserEvents(req, res) { // возвращает все события пользователя по id
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
        return res.status(404).json({ message: "Event organizer not found" });
      }
      if (!owner.status || owner.role !== "creator") {
        return res.status(406).json({
          message: "This user type does not have permission to create events",
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
          message: "This user type does not have permission to edit any events",
        });
      }

      const event = await Event.findByIdAndUpdate(
        event_id,
        { ...req.body },
        { new: true }
      );
      await event.save();
      return res.status(200).send(event);
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
