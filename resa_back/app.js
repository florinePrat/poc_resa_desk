require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require("morgan");
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const path = require('path');




mongoose.connect(process.env.MONGODB_URI,
{})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch((err) => console.log('Connexion à MongoDB échouée !', err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(bodyParser.json());
app.use(morgan('dev'));


app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'my-header,X-Requested-With,content-type,Authorization');
    //res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
    res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
    res.setHeader("Expires", "0"); // Proxies.

    next();
});
// app.use(forceHttps);

//routes accessible without being authenticated are redirected in routes
app.use("/api", require('./server/routes/publicRoutes'));

//All routes with retricted content pass trough the isAuth middleware to verify authentication
app.use("/api", require('./server/middleware/auth'), require('./server/routes/privateRoutes'));

/* Handling errors */
app.use((req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message,
            status: err.status
        }
    });
});


const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
const port = normalizePort(process.env.PORT || '3000');

app.listen(port, () => {
    console.log('Server is running on port : ' + port)
});
module.exports = app;

