//install packages
const express = require('express');
const mongoose = require('mongoose');

//set port
const PORT = process.env.PORT || 3000;

const app = express();

//parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//use static files
app.use(express.static("public"));

//db connections
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitTrak", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

//routes
app.use(require('./routes/api-routes.js'));
app.use(require('./routes/html-routes.js'));

// server listening
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}..`);
})