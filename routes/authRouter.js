const Router = require("express");
const router = new Router();
const controller = require("../controller/authController.js");

router.post("/signup", controller.signup);

router.put("/:id", controller.userUpdate);

router.post("/signin", controller.signin);

router.get("/user", controller.getUserById);

module.exports = router;