const Router = require("express");
const router = new Router();
// const controller  = require("../controller/eventController.js");
const { upload, controller } = require("../controller/eventController.js");
const middleware = require("../middleware/authMiddleware.js");

router.post("/", middleware, upload.array('images'), controller.addEvent);
router.delete("/:id", middleware, controller.deleteEvent);
router.put("/:id", middleware, controller.editEvent);
router.get("/", middleware, controller.getEvents);

module.exports = router;