const express = require('express');
const router = express.Router();
const adminMiddleWare = require('../middleware/main.middleware')
const adminController = require('../controllers/admin.controller');
const multer = require('multer');

const upload = multer({storage: multer.memoryStorage()})

// Create Admin Registration Route

    router.post(
        '/register',
        // adminMiddleWare.validateAdminRegistration,
        upload.array('image', 50),

        adminController.createAdminRegistration 
    )
    router.get(
        '/images',
        adminController.findImage
    )
    
    router.post(
        '/login', adminController.loginAdmin
    )
module.exports = router;