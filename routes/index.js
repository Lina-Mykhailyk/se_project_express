const router = require("express").Router();
const userRouter = require("./users");
const itemRouter = require("./clothingItems");
const { createUser, login } = require("../controllers/users");

router.post("/signin", login);
router.post("/signup", createUser);

router.use("/users", userRouter);
router.use("/items", itemRouter);

module.exports = router;
