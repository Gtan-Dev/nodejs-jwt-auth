const express = require('express');
const mongoose = require('mongoose');
// import cors
const cors = require('cors');

const router = require('./routes/userRoutes');
// import body-parser
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
// const { authMiddleware } = require('./middleware/authMiddleware');

const app = express();
app.use(cors());
const port = 3000;

// initialize dotenv
require('dotenv').config();

// test server
app.get('/', (req, res) => res.send('Hello World!'));


// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
// // Routes
app.use('/user', router);
app.use('/auth', authRoutes);

// not found route
app.use((req, res, next) => {
    return res.status(404).json({
        error: '404 Not Found'
    });
});

// connect to mongodb
mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://byamungulewis:3Sy08zlek8WmMjpA@cluster0.1kyob6u.mongodb.net/', {
    useNewUrlParser: true
});

// mongoose.connect('mongodb://localhost:27017/learning', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// test connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database mongodb @ 27017');
    app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});
mongoose.connection.on('error', (err) => {
    if (err) {
        console.log('Error in database connection:' + err);
    }
});
