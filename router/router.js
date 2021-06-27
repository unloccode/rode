let express = require('express');
let router = express.Router();

//require controllers
const users = require('../controller/controller.js');

router.post('/api/user', users.createUser);
router.get('/api/user/:id', users.getUser);
router.get('/api/users', users.Users);
router.put('/api/user', users.updateUser);
router.delete('/api/user/:id', users.deleteUser);

module.exports = router;