const entries = [
    {date: '09/28/1975', name: 'Jack Torrance', content: 'This is a first entry in my diary...'},
    {date: '10/13/1975', name: 'Jack Torrence', content: 'This walls are crushing me...'},
    {date: '11/05/1975', name: 'Jack Torrens', content: 'I have to keep writing...'},
    {date: '01/06/1976', name: 'JACK THE MURDER', content: 'Where is this little NASTY BOY...'},
  ];

  module.exports = {
    getAll
  };
  	
  function getAll() {
    return entries;
  }