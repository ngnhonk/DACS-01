const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middlewares/auth.middlewares");
const bodyParser = require("body-parser");
const userControllers = require("../controllers/user.controller");
const userMiddlewares = require("../middlewares/user.middlewares");

router.use(bodyParser.json());
router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

router.get("/profile", authenticate, userControllers.getInformation);
router.put("/username", authenticate, userControllers.getUsername);
router.put("/update", authenticate, userControllers.changeInformation);
router.put("/bio", authenticate, userControllers.changeBio);
router.put(
  "/change-password",
  authenticate,
  userMiddlewares.passwordValidation,
  userControllers.changePassword
);
router.delete("/delete", authenticate, userControllers.deleteUser);
router.post("/avatar", authenticate, userControllers.changeAvatar);

module.exports = router;
