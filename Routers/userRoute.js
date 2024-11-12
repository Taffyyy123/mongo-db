const Router = require("express");
const userController = require("../controller/userController");
const userRouter = Router();

userRouter.post(
  "/signup",
  userController.hashedPasswordMiddleWare,
  userController.signupUser
);
userRouter.post("/login", userController.checkLogin, userController.loginUser);
userRouter.delete("/delete", userController.checkId, userController.deleteUser);

module.exports = userRouter;
