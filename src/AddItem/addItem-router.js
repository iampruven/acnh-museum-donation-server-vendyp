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
          console.log(newItem)
        res.json(newItem);
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const { name, date } = req.body;
    const user_id = req.user.id;
    const knexInstance = req.app.get("db");
    AddItemServices.checkItemExists(knexInstance,name)
        .then((results)=> {
            if(!results){
            console.log(results);
            return res.status(400).json({ error: `Name incorrectly spelled or does not exist.` })
            } else{
                AddItemServices.getByName(knexInstance, name)
                .then((data) => {
                  const item_id = data.id;
                  AddItemServices.checkItemDonation(knexInstance, user_id, item_id)
                    .then((results) => {
                      const userHasdon = results.length > 0;
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
                    })
                    .catch(next);
                })
                .catch(next);
            }
        })
        .catch(next);
    
  });

AddItemRouter.route("/:id")
  .all(requireAuth)
  .delete((req, res, next) => {
    const { id } = req.params;
    const user_id = req.user.id;
    const knexInstance = req.app.get("db");
    AddItemServices.deleteItem(knexInstance, id, user_id)
      .then(() => res.status(204).end())
      .catch(next);
  });

AddItemRouter.route("/getAll").get((req, res, next) => {
  const knexInstance = req.app.get("db");
  AddItemServices.getAllNames(knexInstance)
    .then((results) => res.send(results.map((x) => x.name)))
    .catch(next);
});

module.exports = AddItemRouter;
