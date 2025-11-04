
var ImageKit = require("imagekit");
require('dotenv').config()
var imagekit = new ImageKit({
publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT
});


async function uploadImageToStorage(file,fileName) {
    try {
        const result = await imagekit.upload({
            file : file, // required
            fileName : fileName,  // required
        })
        return result;
    } catch (error) {
        console.log("ImageKIt Upload Error:", error);
    }
} 
module.exports = {
    uploadImageToStorage
}