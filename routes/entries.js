var express = require('express');
var router = express.Router();
var entriesCtrl = require('../controllers/entries')

/* GET entries listing. */
router.get('/', entriesCtrl.index)

// DELETE /todos/:id
router.delete('/:id', entriesCtrl.delete)

module.exports = router;
