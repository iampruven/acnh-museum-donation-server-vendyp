# ACNH Museum Donation Tracker

## Link to website:

https://capstone-one-vp.now.sh/

## Link to live app:

https://enigmatic-forest-29965.herokuapp.com

### Intended audience:

Users who play Nintendo Switch's Animal Crossing:New Horizons.

### Problem:

There is no way to know what items a user has donated to the museum, but to go up to each item in the many rooms to see what and when the user has donated the item.

### Solution:

As a fan of planning/tracking, I was inspired to create this app to help me keep track of what I have donated instead of keeping track on paper or a spreadsheet.

## Endpoints

#### AddItemsRouter
##### ('/api/items')
- GET
- get items per user 
- POST 
- create new item with date per user
- ('/:id')
- DELETE
- delete item per user
- ('/getall')
- GET
- gets all items from database to generate the auto-suggest when on adding an item page


#### UserRouter 
##### ('/api/users')
- POST
- create a new user with password

#### AuthRouter('/api/auth')
##### ('/login')
- POST
- send valid credentials


## Technology:

### Client:
- React 
- CSS 
- HTML

### Server:
- Node.js 
- Express 
- Knex

### Database:
- PostgreSQL


### Summary:

1. User is able to GET,POST,DELETE.
2. Create new items to add to their donation list.
3. User is able to view what they have donated.
4. User is able to delete the items they have donated.
5. User is able to login.
6. User is able to logout.
7. User is able to sign up for an account.
8. User is required to meet requirements for password.
9. User is not allowed to go to the login page if redirected.
10. User is not allowed to go to the items page if not logged in.
11. If user is logged in, they will not be allowed to view the landing page.
12. I have set private routes and public routes.
13. Pages are protected unless the user has logged in.
14. There is a landing page with a demo user and instructions.
