const Entry = require('../models/entry')

module.exports = {
    index
}

function index(req, res){
    res.render('entries/index', {
      entries: Entry.getAll(),
      title: 'All Entries:'
    });
}