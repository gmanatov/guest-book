var express = require('express');
var router = express.Router();
var entriesCtrl = require('../controllers/entries')

/* GET entries listing. */
router.get('/', entriesCtrl.index)

// Define below BEFORE show route!
router.get('/new', entriesCtrl.new)
// POST /entries
router.post('/', entriesCtrl.create)


// GET /entries/:id
router.get('/:id', entriesCtrl.show)
// GET /entries/:id/edit
router.get('/:id/edit', entriesCtrl.edit)
// POST /entries/:id/comments
router.post('/:id/comments', entriesCtrl.createComment)
// DELETE /entries/:id
router.delete('/:id', entriesCtrl.delete)
// DELETE /entries/:id/comments/:id
router.delete('/:id/comments/:cid', entriesCtrl.deleteComment)
// PUT /entries/:id
router.put('/:id', entriesCtrl.update)

module.exports = router;
