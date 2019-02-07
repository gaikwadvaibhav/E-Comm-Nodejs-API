var express = require('express');
var router = express.Router();

var userController = require('../controller/user')
var addressController = require('../controller/address')
var fileUploadController = require('../buzhelper/file-handler')

router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});

// Users
router.post('/api/signUp', userController.signup);
router.post('/api/login', userController.login);

// Address
router.post('/api/address/add', addressController.addAddress);
router.get('/api/address/:id', addressController.getAddressByUserId);
router.put('/api/address', addressController.updateAddress)
router.delete('/api/address/remove/:id', addressController.removeAddress)


// Admin
router.post('/api/upload', fileUploadController.uploadFile )
router.post('/api/uploadFiles', fileUploadController.uploadFiles )

// uploadFile uploadFiles

module.exports = router;