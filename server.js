//install packages
const express = require('express');
const logger = require("morgan");
const mongoose = require('mongoose');

//set port
const PORT = process.env.PORT || 3003;

const app = express();

app.use(logger("dev"));

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
require('./routes/apiRoute.js')(app);
require('./routes/htmlRoute.js')(app);

// server listening
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}..`);
})