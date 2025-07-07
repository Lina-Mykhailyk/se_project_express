const router = require("express").Router();
const userRouter = require("./users");
const itemRouter = require("./clothingItems");
const { createUser, login } = require("../controllers/users");
const auth = require("../middlewares/auth");
const {
  validateUserBody,
  validateLoginBody,
} = require("../middlewares/validation");
const NotFoundError = require("../errors/NotFoundError");

router.post("/signin", validateLoginBody, login);
router.post("/signup", validateUserBody, createUser);

router.get("/items", require("../controllers/clothingItems").getItems);

router.use(auth);

router.use("/users", userRouter);
router.use("/items", itemRouter);

router.use("*", (req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
