const router = require("express").Router();
const { getCurrentUser, updateCurrentUser } = require("../controllers/users");
const { validateUpdateUserBody } = require("../middlewares/validation");

router.get("/me", getCurrentUser);
router.patch("/me", validateUpdateUserBody, updateCurrentUser);

module.exports = router;
