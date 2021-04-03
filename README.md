# node-js-mentoring
## Module 2
### API specification
Method | Path | Description
--- | --- | ---
GET | /users | Returns all not deleted users.
GET | /users/:id | Returns user by id, even it it was deleted.
POST | /users | Create a user with the following properties <br>- login <br>- password <br>- age
PUT | /users/:id | Update the user by id.
DELETE | /users/:id | Delete user by id.
GET | /search?login=login&limit=max_rows | Search user by login and cut the result according to the limit.    
 
