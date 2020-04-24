ACNH Museum Donation Tracker
Link to live app:
https://enigmatic-forest-29965.herokuapp.com



AddItemsRouter('/api/items')
('/')
GET
get items per user 
POST 
create new item with date per user
('/:id')
DELETE
delete item per user
('/getall')
GET
gets all items from database to generate the auto-suggest when on adding an item page


UserRouter ('/api/users')
POST
create a new user with password

AuthRouter('/api/auth')
('/login')
POST
send valid credentials

AuthRouter()
Technology:
Client:
React, CSS, HTML
Server:
Node.js, Express, Knex
Database: 
PostgreSQL