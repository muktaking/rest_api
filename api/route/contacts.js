const express = require("express");
const router = express.Router();
const contactController = require('../controllers/contact');

 
router.get('/', contactController.getAllContactControllers);
router.post('/', contactController.postNewContactControllers);

router.get('/:id', contactController.getSingleContact);
router.delete('/:id', contactController.deleteContact);

module.exports = router; 