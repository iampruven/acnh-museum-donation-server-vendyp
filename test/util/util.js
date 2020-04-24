function cleanTable(db) {

      return db.transaction((trx) =>
        trx.raw(
          `TRUNCATE
        acnh_users,
        acnh_user_item
      `
        )
      );

}

module.exports = cleanTable;
