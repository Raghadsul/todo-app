const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/todos_db", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then( () => console.log("Succesfully connected to todos_db"))
    .catch(err => console.err(err));