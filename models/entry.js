const entries = [
    {id: 124624, date: '09/28/1975', time: '03:55:06 PM', author: 'Jack Torrance', content: 'We just moved in, and what a wonderful building building this is...'},
    {id: 125223, date: '10/13/1975', time: '01:20:20 AM', author: 'Jack Torrence', content: 'This walls are crushing me...'},
    {id: 127904, date: '11/05/1975', time: '06:00:00 AM', author: 'Jack Torrens', content: 'I have to keep writing...'},
    {id: 139608, date: '01/06/1976', time: '04:02:00 AM', author: 'JACK THE MURDER', content: 'Where is this little NASTY BOY...'},
  ];

  module.exports = {
    getAll,
    deleteOne,
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