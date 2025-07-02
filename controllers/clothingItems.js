const Item = require("../models/clothingItem");
const BadRequestError = require("../errors/BadRequestError");
const ForbiddenError = require("../errors/ForbiddenError");
const NotFoundError = require("../errors/NotFoundError");

const getItems = (req, res, next) => {
  Item.find({})
    .then((items) => res.send(items))
    .catch(next);
};

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  Item.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(
          new BadRequestError("Invalid data passed when creating the item.")
        );
      } else {
        next(err);
      }
    });
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;
  const currentUserId = req.user._id;

  Item.findById(itemId)
    .orFail(() => new NotFoundError("Item ID not found."))
    .then((item) => {
      if (item.owner.toString() !== currentUserId) {
        throw new ForbiddenError(
          "You cannot delete items owned by other users."
        );
      }
      return item
        .deleteOne()
        .then(() => res.send({ message: "Item deleted successfully." }));
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid item ID format."));
      } else {
        next(err);
      }
    });
};

const likeItem = (req, res, next) => {
  Item.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => new NotFoundError("Item not found."))
    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid item ID format."));
      } else {
        next(err);
      }
    });
};

const dislikeItem = (req, res, next) => {
  Item.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => new NotFoundError("Item not found."))
    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid item ID format."));
      } else {
        next(err);
      }
    });
};

module.exports = { getItems, createItem, deleteItem, likeItem, dislikeItem };
