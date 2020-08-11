const express = require('express');
const router = express.Router();

const checkAuth = require('../middlewares/check-auth');
const Contact = require('../controllers/contactController');

router.get('/find', Contact.find);
router.get('/like', Contact.like);
router.post('/update', Contact.update);
router.post('/delete', Contact.delete);
router.get('/', Contact.show);
router.post('/', Contact.create);

/*
router.get('/find',checkAuth, Contact.find);
router.post('/update',checkAuth, Contact.update);
router.post('/delete',checkAuth, Contact.delete);
router.get('/',checkAuth, Contact.show);
router.post('/',checkAuth, Contact.create);
*/



module.exports = router;