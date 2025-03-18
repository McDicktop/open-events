const Router = require("express");
const router = new Router();
const { upload, controller } = require("../controller/eventController.js");
const middleware = require("../middleware/authMiddleware.js");

router.get("/", controller.getEvents);
router.post("/", middleware, upload.array('images'), controller.addEvent);  // создание события

router.delete("/:id", middleware, controller.deleteEvent);                  // удаление события по id
router.put("/:id", middleware, controller.editEvent);                       // редактирование события по id

router.get("/user/:id", controller.getUserEvents);                        // получение всех событий пользователя                      


module.exports = router;