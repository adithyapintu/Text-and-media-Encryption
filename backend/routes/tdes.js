const express = require('express');
const router = express.Router();
const CryptoJS = require('crypto-js');


router.post('/encrypt', async (req, res) => {

    try{

        message = req.body.message;
        key = req.body.key;

        const encrypted = CryptoJS.TripleDES.encrypt(message, key).toString();

        res.json({encrypted})
    }
    catch(err){
        console.error(err);
        res.send("Internal Server Error")
    }
})

router.post('/decrypt', async (req, res) => {

    try{

        message = req.body.message;
        key = req.body.key;

        const decrypted = CryptoJS.TripleDES.decrypt(message, key).toString(CryptoJS.enc.Utf8);

        res.json({decrypted})
    }
    catch(err){
        console.error(err);
        res.send("Internal Server Error")
    }
})


module.exports = router