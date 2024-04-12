const Entry = require('../models/entry')

module.exports = {
    index,
    delete: deleteEntry
}

function index(req, res){
    res.render('entries/index', {
      entries: Entry.getAll(),
      title: 'All Entries:'
    });
}

function deleteEntry(req, res) {
    Entry.deleteOne(req.params.id)
    res.redirect('/entries')
  }