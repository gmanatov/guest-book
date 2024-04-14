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

async function index(req, res){
  const entries = await Entry.find({})
  res.render('entries/index', {
    entries,
    title: 'All Entries:'
  });
}

//LEGACY function index(req, res){
//     res.render('entries/index', {
//       entries: Entry.getAll(),
//       title: 'All Entries:'
//     });
// }

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

async function create(req, res){
  let now = new Date();
  // "Randomizing ID"
  req.body.id = Date.now() % 1000000
  let month = now.getMonth() + 1
  if (month < 10) {month = '0' + month}
  let day = now.getDate()
  if (day < 10) {day = '0' + day}
  let year = now.getFullYear()
  req.body.date = `${month}/${day}/${year}`
  let time = new Date().toLocaleTimeString()
  if (time[1] == ':') {time = '0' + time}
  req.body.time = time
  if (req.body.author == '') {req.body.author = '<blank>'}

  try {
    await Entry.create(req.body);
    // Always redirect after CUDing data
    // We'll refactor to redirect to the movies index after we implement it
    res.redirect('/entries');
  } catch (err) {
    // Typically some sort of validation error
    console.log(err);
    res.render('entries/new', { errorMsg: err.message });
  }
}

//LEGACY function create(req, res) {
//   console.log(req.body)
//   // Models are responsible for CRUD'ing the data
//   Entry.create(req.body)
//   //Always do a redirect when data has been changed
//   res.redirect('/entries')
// }

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