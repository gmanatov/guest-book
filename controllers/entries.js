const Entry = require('../models/entry')

module.exports = {
    index,
    delete: deleteEntry,
    show,
    new: newEntry,
    create,
    edit,
    update,
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

function newEntry(req, res) {
  res.render('entries/new', {
  title: 'Please enter new Entry!'
  });
}

function create(req, res) {
  console.log(req.body)
  // Models are responsible for CRUD'ing the data
  Entry.create(req.body)
  //Always do a redirect when data has been changed
  res.redirect('/entries')
}

function edit(req,res) {
  const entry = Entry.getOne(req.params.id)
  res.render('entries/edit', {
    title: 'Edit Entry',
    entry
  })
}

function update(req, res){
  Entry.update(req.params.id, req.body)
  res.redirect(`/entries/${req.params.id}`)
}