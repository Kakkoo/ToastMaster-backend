const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/api/users');
const main = require("./routes/api/main");
const record = require("./routes/api/record");
const app = express();
app.get('/', (req, res) => res.send('Hello World!'));

app.use('/api/users', users);
app.use('/api/main', main);
app.use('/api/record', record);

const port = 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));
//DB congig
const db = require('./config/keys').mongoURI;
//Connect to mongodb
mongoose
.connect(db)
.then(() => console.log('MongoDb connected'))
.catch(err => console.log(err));