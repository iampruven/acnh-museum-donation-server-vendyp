const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function makeUsersArray() {
  return [
    {
      id: 1,
      user_name: 'test-user-1',
      full_name: 'Test user 1',
      nickname: 'TU1',
      password: 'password',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 2,
      user_name: 'test-user-2',
      full_name: 'Test user 2',
      nickname: 'TU2',
      password: 'password',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 3,
      user_name: 'test-user-3',
      full_name: 'Test user 3',
      nickname: 'TU3',
      password: 'password',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
    {
      id: 4,
      user_name: 'test-user-4',
      full_name: 'Test user 4',
      nickname: 'TU4',
      password: 'password',
      date_created: new Date('2029-01-22T16:28:32.615Z'),
    },
  ]
}

function makeItemsArray(users) {
  return [
    {
        id: 7,
        item_id:8,
        user_id: users[0].id,
        date: new Date('2029-01-22T16:28:32.615Z')},
    {
        id: 5,
        item_id:6,
        user_id: users[1].id,
        date: new Date('2029-01-22T16:28:32.615Z')},
    {
      id: 2,
      item_id:1,
      user_id: users[2].id,
      date: new Date('2029-01-22T16:28:32.615Z')
      
    },
    {
        id: 3,
      item_id:2,
      user_id: users[2].id,
      date: new Date('2029-01-22T16:28:32.615Z')
    },
  ]
}










function cleanTables(db) {
  return db.transaction(trx =>
    trx.raw(
      `TRUNCATE
        acnh_user_item,
        acnh_users
      `
    )
    .then(() =>
    //   Promise.all([
    //     trx.raw(`ALTER SEQUENCE blogful_articles_id_seq minvalue 0 START WITH 1`),
    //     trx.raw(`ALTER SEQUENCE blogful_users_id_seq minvalue 0 START WITH 1`),
    //     trx.raw(`ALTER SEQUENCE blogful_comments_id_seq minvalue 0 START WITH 1`),
    //     trx.raw(`SELECT setval('blogful_articles_id_seq', 0)`),
    //     trx.raw(`SELECT setval('blogful_users_id_seq', 0)`),
    //     trx.raw(`SELECT setval('blogful_comments_id_seq', 0)`),
    //   ])
    console.log('hello')
    )
  )
}

function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }))
  return db.into('acnh_users').insert(preppedUsers)
    .then(() =>
      // update the auto sequence to stay in sync
      db.raw(
        `SELECT setval('blogful_users_id_seq', ?)`,
        [users[users.length - 1].id],
      )
    )
}

function seedItemsTables(db, users, item, comments=[]) {
  // use a transaction to group the queries and auto rollback on any failure
  return db.transaction(async trx => {
    await seedUsers(trx, users)
    await trx.into('acnh_user_item').insert(item)
    // update the auto sequence to match the forced id values
    await trx.raw(
      `SELECT setval('acnh_user_item_id_seq', ?)`,
      [articles[item.length - 1].id],
    )
  })
}

function seedMaliciousItem(db, user, item) {
  return seedUsers(db, [user])
    .then(() =>
      db
        .into('acnh_user_item')
        .insert([item])
    )
}
function makeItemsFixture() {
    const testUsers = makeUsersArray()
    const testArticles = makeItemsArray(testUsers)

    return { testUsers, testArticles}
  }
function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.user_name,
    algorithm: 'HS256',
  })
  return `Bearer ${token}`
}

module.exports = {
  makeUsersArray,
  makeItemsArray,

makeItemsFixture,
  cleanTables,
  seedItemsTables,
  makeAuthHeader,
  seedUsers,
}
