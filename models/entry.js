const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;
	
const entrySchema = new Schema({
  id: Number,
  date: String,
  time: String,
  author: String,
  content: String
}, {
    timestamps: true
  });
	
// Compile the schema into a model and export it
module.exports = mongoose.model('Entry', entrySchema);





const entries = [
    {id: 124624, date: '09/28/1975', time: '03:55:06 PM', author: 'Jack Torrance', content: 'We just moved in, and what a wonderful building building this is...'},
    {id: 125223, date: '10/13/1975', time: '01:20:20 AM', author: 'Jack Torrence', content: 'These walls are crushing me...'},
    {id: 127904, date: '11/05/1975', time: '06:00:00 AM', author: 'Jack Torrens', content: 'I have to keep writing...'},
    {id: 139608, date: '01/06/1976', time: '04:02:00 AM', author: 'JACK THE MURDER', content: 'Where is this little NASTY BOY...'},
  ];

  module.exports = {
    getAll,
    deleteOne,
    getOne,
    create,
    update
  };
  	
  function getAll() {
    return entries;
  }

  function deleteOne(id) {
    id = parseInt(id)
    // Find the index for the entry
    const idx = entries.findIndex(entry => entry.id === id)
    entries.splice(idx, 1)
  }

  function getOne(id) {
    id = parseInt(id)
    return entries.find(entry => entry.id === id)
  }

  function create(entry) {
    let now = new Date();
    // "Randomizing ID"
    entry.id = Date.now() % 1000000
    let month = now.getMonth() + 1
    if (month < 10) {month = '0' + month}
    let day = now.getDate()
    if (day < 10) {day = '0' + day}
    let year = now.getFullYear()
    entry.date = `${month}/${day}/${year}`
    let time = new Date().toLocaleTimeString()
    if (time[1] == ':') {time = '0' + time}
    entry.time = time
    if (entry.author == '') {entry.author = '<blank>'}
    entries.push(entry)
  }

  function update(id, updatedEntry){
    id = parseInt(id)
    const entry = entries.find(entry => entry.id === id)
    //entry.content = updatedEntry.content
    Object.assign(entry, updatedEntry)
  }