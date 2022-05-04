const express = require('express');
const router = express.Router()
const CryptoJS = require('crypto-js')

router.post('/encrypt', async(req,res) => {

    try{
        const key = req.body.key
        const message = req.body.message

        let encrypted = CryptoJS.AES.encrypt(message, key).toString()

        res.json({encrypted})

    }
    catch(err){
        console.log(err.message)
        res.send("Internal server error")
    }

})

router.post('/decrypt', async(req,res) => {

    try{
        const message = req.body.message
        const key = req.body.key

        const decrypted = CryptoJS.AES.decrypt(message, key).toString(CryptoJS.enc.Utf8)
        // const decrypted = "Under Development"
        res.json({decrypted})
    }

    catch(err){
        console.log(err.message)
        res.send("Internal server error")
    }
})

module.exports = router