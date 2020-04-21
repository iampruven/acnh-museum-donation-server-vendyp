const express = require("express");
const AddItemServices = require("./addItem-service");
const jsonParser = express.json();
const AddItemRouter = express.Router();
const { requireAuth } = require("../middleware/jwt-auth");
AddItemRouter.route("/")
  .all(requireAuth)
  .get((req, res, next) => {
    AddItemServices.getNewItems(req.app.get("db"), req.user.id)
      .then((newItem) => {
        res.json(newItem);
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const { name, date } = req.body;
    const user_id = req.user.id;
    const knexInstance = req.app.get("db");
    AddItemServices.getByName(knexInstance, name)
      .then((data) => {
        const item_id = data.id;
        AddItemServices.checkItemDonation(knexInstance, user_id, item_id)
            .then(
          (results) => {
              console.log('this is',results)
              const userHasdon =results.length>0
            if (userHasdon) {
              return res.status(400).json({
                error: `You have already donated this item.`,
              });
            } else {
              const newItem = { user_id, item_id, date };
              return AddItemServices.insertItem(knexInstance, newItem).then(
                (userItem) => {
                  userItem.name = data.name;
                  userItem.img = data.img;
                  res.status(201).json(userItem);
                }
              );
            }
          }
        )
        .catch(next)
      })
      .catch(next);
  });

AddItemRouter.route("/:id")
  .all(requireAuth)
  .delete((req, res, next) => {
    const { id } = req.params;
    console.log(id)
    const user_id  = req.user.id;
    console.log(user_id)
    const knexInstance = req.app.get("db");
    AddItemServices.deleteItem(knexInstance, id, user_id)
      .then(() => res.status(204).end())
      .catch(next);
  });

module.exports = AddItemRouter;
