//install packages
const express = require('express');
const mongoose = require('mongoose');
//set port
const PORT = process.env.PORT || 3000;

const app = express();

//use static files
app.use(express.static("public"));

//parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fittrack", { useNewUrlParser: true });

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}..`);
})