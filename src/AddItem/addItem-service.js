const AddItemService = {
  getNewItems(knex,user_id) {
    return knex
      .select("animal_crossing.id", "animal_crossing.img", "animal_crossing.type", "animal_crossing.name", "acnh_user_item.date")
      .from("acnh_user_item")
      .join("animal_crossing", "acnh_user_item.item_id","=", "animal_crossing.id")
      .where("user_id", user_id);
  },
  insertItem(knex, newItem) {
    return knex
      .insert(newItem)
      .into("acnh_user_item")
      .returning("*")
      .then((rows) => {
        console.log("row 0", rows[0]);
        return rows[0];
      });
  },

  getById(knex, id) {
    return knex.from("acnh_user_item").select("*").where("id", id).first();
  },
  getByName(knex, name){
      return knex.from("animal_crossing").select("*").where("name", name).first();
  },
  deleteItem(knex, id) {
    return knex("acnh_user_item").where({ id }).del();
  } 
  
};

module.exports = AddItemService;
