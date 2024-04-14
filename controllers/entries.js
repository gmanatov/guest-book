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

//LEGACY NON DB function index(req, res){
//     res.render('entries/index', {
//       entries: Entry.getAll(),
//       title: 'All Entries:'
//     });
// }

async function deleteEntry(req, res) {
  const delId = parseInt(req.params.id)
  await Entry.deleteOne({id: delId})
  res.redirect('/entries')
}

//LEGACY NON DB function deleteEntry(req, res) {
//     Entry.deleteOne(req.params.id)
//     res.redirect('/entries')
// }

async function show(req, res) {
  const chsnEntr = parseInt(req.params.id)
  const entry = await Entry.findOne({id: chsnEntr})
  res.render('entries/show', {
    entry,
    title: 'Details of an Entry:'
  })
}

//LEGACY NON DB function show(req, res) {
//   res.render('entries/show', {
//     entry: Entry.getOne(req.params.id),
//     title: 'Details of an Entry'
//   })
// }

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
    res.redirect('/entries');
  } catch (err) {
    // Typically some sort of validation error
    console.log(err);
    res.render('entries/new', { errorMsg: err.message });
  }
}

//LEGACY NON DB function create(req, res) {
//   console.log(req.body)
//   // Models are responsible for CRUD'ing the data
//   Entry.create(req.body)
//   //Always do a redirect when data has been changed
//   res.redirect('/entries')
// }

async function edit(req,res) {
  const chsnId = parseInt(req.params.id)
  const entry = await Entry.findOne({id: chsnId})
  res.render('entries/edit', {
    title: 'Edit Entry',
    entry
  })
}

//LEGACY NON DB function edit(req,res) {
//   const entry = Entry.getOne(req.params.id)
//   res.render('entries/edit', {
//     title: 'Edit Entry',
//     entry
//   })
// }

async function update(req, res){
  const updId = parseInt(req.params.id)
  const entry = await Entry.findOne({id: updId})
  Object.assign(entry, req.body)
  await entry.save()
  res.redirect(`/entries/${req.params.id}`)
}

//LEGACY NON DB function update(req, res){
//   Entry.update(req.params.id, req.body)
//   res.redirect(`/entries/${req.params.id}`)
// }