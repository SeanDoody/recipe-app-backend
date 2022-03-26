const express = require('express');
const app = express();
const cors = require('cors');
const users = require('./routes/users.js');
const recipes = require('./routes/recipes.js');

app.use(express.json());
app.use(cors());
app.use('/users', users);
app.use('/recipes', recipes);
app.use(express.static(__dirname + '/public'));

console.log(process.env);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));