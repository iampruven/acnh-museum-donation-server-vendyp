const knex = require('knex');
const app = require('../src/app')
const helpers = require('./test-helper');

describe('AddItem router',()=>{
    let db


    const {
        testUsers,
        testItems,
      } = helpers.makeItemsFixture()
    before('make knex instance', () => {
        db = knex({
          client: 'pg',
          connection: process.env.TEST_DB_URL,
        })
        app.set('db', db)
      })
    
      after('disconnect from db', () => db.destroy())
    
      before('cleanup', () => helpers.cleanTables(db))
    
      afterEach('cleanup', () => helpers.cleanTables(db))

      beforeEach('insert articles', () =>
      helpers.seedArticlesTables(
        db,
        testUsers,
        testItems
      )
    )
    it('GET gets the items',()=>{
        return supertest(app)
            .get('/')
    })
})