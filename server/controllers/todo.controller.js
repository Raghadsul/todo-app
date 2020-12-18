const Todos = require("../models/todo.model");


class TodoController {

    getAll(req, res) {
        Todos.find({}).sort({ dueDate : 1})
            .then(allTodos=> res.json({ tasks: allTodos}))
            .catch(err => res.json(err));
    }

    createNew(req, res) {
        Todos.create(req.body)
        .then(newTodo => res.json({task: newTodo}))
        .catch(err => res.json(err));
    }

    getOne(req, res) {
        Todos.findOne({_id: req.params._id})
            .then(oneTodo => res.json({task: oneTodo}))
            .catch(err => res.json(err));
    }

    getManyByStatus(req, res) {
        Todos.find({status: req.params.status})
            .then(manyTodos => res.json({tasks: manyTodos}))
            .catch(err => res.json(err));
    }

    updateStatus(req, res) {
        Todos.findByIdAndUpdate({_id: req.params._id}, {$set: {status: req.params.status}}, {new: true})
            .then(() => res.json({msg: "ok"}))
            .catch(err => res.json(err));
    }

    removeOne(req, res) {
        Todos.deleteOne({_id: req.params._id})
            .then(() => res.json({msg: "ok"}))
            .catch(err => res.json(err));
    }

}

module.exports = new TodoController();