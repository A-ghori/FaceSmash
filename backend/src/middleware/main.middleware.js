const adminModel = require("../models/admin.model");

const jwt = require("jsonwebtoken");

// Middleware to verify Admin Authentication
const verifyAdminAuth = async ( req, res, next) => {
    
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message: "unauthorized no token found, pleas login or register first "
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await adminModel.findById(decoded.id)
        if(!admin){
            return res.status(401).json({
               success: false,
                message: "unauthorized admin not found, please register first"
            })
        }
        req.admin = admin;
        next()
    } catch (error) {
        res.status(401).json({
            message: "Invalid token"
        })
    }
}

module.exports = verifyAdminAuth