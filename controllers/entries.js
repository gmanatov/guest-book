const Entry = require('../models/entry')

module.exports = {
    index,
    delete: deleteEntry,
    show
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

function show(req, res) {
  res.render('entries/show', {
    entry: Entry.getOne(req.params.id),
    title: 'Details of an Entry'
  })
}