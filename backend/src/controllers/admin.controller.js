const express = require('express');
const adminModel = require('../models/admin.model');
const jwt = require('jsonwebtoken');
const storageService = require('../services/storage');
const { v4: uuid } = require('uuid');


// Create admin Resgistration Page 
const createAdminRegistration = async ( req,res) => {
     
    try {
        const { name , email , password } = req.body;
       if(!name || !email || !password){
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
       }
        const adminAlreadyExist = await adminModel.findOne({ 
            email

        })
           if(adminAlreadyExist){
            return res.status(400).json({
                message: "Admin already exists"
            })
        }

        if(!req.files || (!req.files.image) ){
            return res.status(400).json({
                success: false,
                message: "Image file is required"
            })
        }

        let imageUrl = '';
        // Upload Image
        if(req.files.image && req.files.image[0]){
            const imageBuffer = req.files.image[0].buffer.toString('base64');
            const imageResult = await storageService.uploadImageToStorage(imageBuffer, uuid());
            imageUrl = imageResult.url;
        }
      
     
        const admin = await adminModel.create({
            name,
            email,
            password,
            image: imageUrl
        })
        const token = jwt.sign({
            id: admin._id,
           // email: admin.email
        }, process.env.JWT_SECRET )
    res.cookie("token", token, {
        httpOnly : true,
        secure : false,
        sameSite: 'lax'
    })
    res.status(201).json({
        message: "Admin registered Successfully",
        admi : {
            _id: admin._id,
            email: admin.email,
            name: admin.name,
            password: admin.password,
            image: admin.image
        }
    })
    } catch (error) {
        return res.status(500).json({
            message: "internal server error from admin restration"
        })
    }

}
// Login Admin Login Page Logic
const loginAdmin = async (req,res) => {
    try {
        const { email, password} = req.body;
        const admin = await adminModel.findOne({
            email,
            password
        })
        if(!admin){
            return res.status(400).json({
                message: "Invalid Credentials for admin Login"
            })
        }

        const token = jwt.sign({
            id: admin._id,

        }, process.env.JWT_SECRET ,{
            expiresIn: '180d'
        });
        // Set cookies for presistent login
        res.cookie('token',token,{
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 180 * 24 * 60 * 60 * 1000 // 180 days
        });
        res.status(200).json({
            message: "Admin Login Successful",
            admin : {
                _id: admin._id,
                name: admin.name,
                email: admin.email,
                image: admin.image
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: "internal server error from admin login"
        })
    }
}


// Fetch all Admins Image for frintend 
const findImage  = async(req,res) => {
    const imageItems = await adminModel.find({

    });
    res.status(200).json({
        success : true,
        message: "Fetched all Admins Image Successfully",
        imageItems
    })
}

module.exports = {
    createAdminRegistration,
    loginAdmin,
    findImage
}