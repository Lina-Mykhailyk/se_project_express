const router = require("express").Router();
const userRouter = require("./users");
const itemRouter = require("./clothingItems");
const { createUser, login } = require("../controllers/users");
const auth = require("../middlewares/auth");

router.post("/signin", login);
router.post("/signup", createUser);
router.get("/items", require("../controllers/clothingItems").getItems);

router.use(auth);

router.use("/users", userRouter);
router.use("/items", itemRouter);

module.exports = router;
