const Router = require("express");
const router = new Router();
const controller = require("../controller/authController.js");
const middleware = require("../middleware/authMiddleware.js");

router.put("/", middleware, controller.userUpdate);
router.get("/", middleware, controller.getUser);

router.post("/signup", controller.signup);
router.post("/signin", controller.signin);

module.exports = router;