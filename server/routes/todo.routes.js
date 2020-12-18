const Todos = require("../controllers/todo.controller");


// this is the REST pattern
module.exports = app => {
    app.get("/api/todos", Todos.getAll);
    app.get("/api/todos/:_id", Todos.getOne);
    app.get("/api/todos/status/:status", Todos.getManyByStatus)
    app.post("/api/todos/new", Todos.createNew);
    app.put("/api/todos/:_id/:status", Todos.updateStatus);
    app.delete("/api/todos/:_id", Todos.removeOne);
}