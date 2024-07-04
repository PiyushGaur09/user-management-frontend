const express = require('express');
var cors = require('cors')
const router = require('./src/routers/user.routes');
require('./src/db/mongooseConnection')

const app = express();

const port = 3000;
app.use(express.json()); 
app.use(express.urlencoded()); 

app.get('/', (req, res) => {
    res.send('Health Api, User Management App is working');
});

app.listen(port, () => {
    console.log(`Server listening at port: ${port}`);
});
app.use(cors()) ;
app.use('/user', router);
