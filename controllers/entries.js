const Entry = require('../models/entry')

module.exports = {
    index
}

function index(req, res){
    res.render('entries/index', {
      todos: Todo.getAll(),
      title: 'All Entries:'
    });
}