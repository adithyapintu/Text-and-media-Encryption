let key = document.getElementById('key')
let add = document.getElementById('toAdd')
let copyBtn = document.getElementById('copy')
// let sendBtn = document.getElementById('send')
let res = document.getElementById('response')
let botButton = document.getElementById('bot')
let aesButton = document.getElementById('aes')
let tdesButton = document.getElementById('tdes')
let textbtn = document.getElementById('textbtn')
let message = document.getElementById('message')
let submit = document.getElementById('submitBtn')
let decbtn = document.getElementById('decryptbtn')
let encbtn = document.getElementById('encryptbtn')
let changeId = document.getElementById('changeId')
let mainTitle = document.getElementById('titleh1')
let backButton = document.getElementById('backBtn')
let imageCard = document.getElementById('imageCard')
let imgChange = document.getElementById('imgChange')
let header = document.getElementById('type-section')
let fileInput = document.getElementById('fileInput')
let encrypt = document.getElementById('hideEncrypt')
let imageButton = document.getElementById('imageBtn')
let audioButton = document.getElementById('audioBtn')
let fileSendBtn = document.getElementById('fileSendBtn')
let option = document.getElementById('encryptContainer')
let titletoChange = document.getElementById('titleChange')
let cardDisplay = document.getElementById('card-to-hidden')
let keyFile = document.getElementById('keyFile')
// let sendMessageCard = document.getElementById('sendMessageCard')

// Functions

// Changing the card
function changeCard(image,title,id){
    if(id === "bot"){
        key.style.display = "none"
    }
    else{
        key.style.display = "block"
    }
    backButton.style.display = "inline"
    header.style.display = "none"
    encrypt.style.display = "none"
    option.style.display = "none"
    cardDisplay.style.display = "block"
    imgChange.src = image
    titletoChange.innerHTML = title
    changeId.id = id
    let buttonName;
    if(option.id === "encryptContainer"){
        buttonName = "encrypt";
    }
    else{
        buttonName = "decrypt";
    }
    submit.innerHTML = buttonName;

    if(res.innerHTML.length === 0){
        sendMessageCard.style.display = "none"
    }

}

//Goback and display all

function goBack() {

    header.style.display = "flex"
    encrypt.style.display = "block"
    option.style.display = "block"
    backButton.style.display = "none"
    cardDisplay.style.display = "none"
    message.value = ""
    key.value = ""
    res.innerHTML = ""
    copyBtn.style.display = "none"

}

//Calling the backend for encryption and decryption
//TODO
async function callApi(m , k, name, type){
    if(name === "audio"){
        console.log(m)
        const dataSent = await fetch(`http://localhost:5000/api/${name}/${type}`,{
            method: "POST",
            headers: {
                mode : "cors"
            },
            body : m
            
        }).then(response => response.blob())
        .then(blob => {
            var url = window.URL.createObjectURL(blob)
            var a = document.createElement('a')
            a.href = url
            if(type == "encrypt"){
                fileName = "encrypted.wav"
            }
            else{
                fileName = "decrypted.wav"
            }
            a.download = fileName
            document.body.appendChild(a)
            a.click()
            a.remove()
        })

    }
    else if(name === "image"){
        const dataSent = await fetch(`http://localhost:5000/api/${name}/${type}`,{
            method: "POST",
            headers : {
                "mode" : "cors",
            },
            body: m
        }).then(response => response.blob())
        .then(blob => {
            var url = window.URL.createObjectURL(blob)
            var a = document.createElement('a')
            a.href = url
            if(type == "encrypt"){
                fileName = "encrypted.jpg"
            }
            else{
                fileName = "decrypted.jpg"
            }
            a.download = fileName
            document.body.appendChild(a)
            a.click()
            a.remove()
        })

    }
    else{
        if(name === 'bot'){
            port = 5000
        }
        else{
            port = 8080
        }
        const messageToSend = await fetch(`http://localhost:${port}/api/${name}/${type}`,{
            method : "POST" ,
            headers : {
                "Content-type" : "application/json"
            },
            body : JSON.stringify({
                message : m,
                key : k
            })
        })
        let responseFromServer = await messageToSend.json()
        if(type === "decrypt"){
        res.innerHTML = responseFromServer.decrypted
        }
        else{
            res.innerHTML = responseFromServer.encrypted
        }
        copyBtn.style.display = "block"
    }
    sendMessageCard.style.display = "block"
}

//Toogle Options

// Text, Image and audio cards
textbtn.addEventListener('click', () => {

    header.id = "text"

    if(encrypt.style.display === "none"){
        encrypt.style.display = "block"
    }

    else{
        encrypt.style.display = "none"
        option.style.display = "none"
    }
    imageCard.style.display = "none"

})

imageButton.addEventListener('click', () => {

    header.id = "image"
    if(encrypt.style.display === "none"){
        encrypt.style.display = "block"
    }

    else{
        encrypt.style.display = "none"
        option.style.display = "none"
    }
    imageCard.style.display = "none"
})

audioButton.addEventListener('click', () => {


    header.id = "audio"
    if(encrypt.style.display === "none"){
        encrypt.style.display = "block"
    }

    else{
        encrypt.style.display = "none"
        option.style.display = "none"
    }
    imageCard.style.display = "none"
})

// Toogle Encryption for Encryption card
encbtn.addEventListener('click' , () => {

    if(header.id === "text"){
        if(option.style.display === "none"){
            option.style.display = "block"
        }
    
        else if(option.style.display === "block" && option.id === "encryptContainer"){
            option.style.display = "none"
        }
    }
    else if(header.id === "audio"){
        if(imageCard.style.display === "none"){
            fileInput.value = ""
            keyFile.value = ""
            imageCard.style.display = "block"
            fileInput.accept = "audio/*"
        }
        else{
            imageCard.style.display = "none"
        }

    }

    else if(header.id === "image"){
        if(imageCard.style.display === "none"){
            fileInput.value = ""
            keyFile.value = ""
            imageCard.style.display = "block"
            fileInput.accept = "image/*"
        }
        else{
            imageCard.style.display = "none"
        }
    }

    option.id = "encryptContainer"

    mainTitle.innerHTML = "HAGS&nbsp;ENCRYPTION"

})

//Toogle Decryption for Decryption card
decbtn.addEventListener('click', () => {

    if(header.id === "text"){
        if(option.style.display === "none"){
            option.style.display = "block"
        }
    
        else if(option.style.display === "block" && option.id === "decryptContainer"){
            option.style.display = "none"
        }
    }
    else if(header.id === "audio"){
        if(imageCard.style.display === "none"){
            fileInput.value = ""
            keyFile.value = ""
            imageCard.style.display = "block"
            fileInput.accept = "audio/*"
        }
        else{
            imageCard.style.display = "none"
        }
    }

    else if(header.id === "image"){
        if(imageCard.style.display === "none"){
            fileInput.value = ""
            keyFile.value = ""
            imageCard.style.display = "block"
            fileInput.accept = "image/*"
        }
        else{
            imageCard.style.display = "none"
        }
    }

    option.id = "decryptContainer"
    mainTitle.innerHTML = "HAGS&nbsp;DECRYPTION" 
})

//Clicking on Name of Encryption card
aesButton.addEventListener('click' , () => {

    changeCard("images/aes.png","AES", "aes")

})

tdesButton.addEventListener('click' , () => {

    changeCard("images/3des.png","Triple DES", "tdes")

})

botButton.addEventListener('click' , () => {

    changeCard("images/bot.png","Bot Encryption", "bot")

})

copyBtn.addEventListener('click', () => {
    let newT = res.innerHTML
    navigator.clipboard.writeText(newT)
})

// Taking data and sending msg to server for Encryption and decryption

fileSendBtn.addEventListener('click', async() => {
    let files = new FormData()
    files.append('file', fileInput.files[0])

    if(keyFile.value.length > 0){
        let blob = new Blob([keyFile.value], { type: "text"});

        files.append("key", blob);


        if(option.id === "encryptContainer"){
            method = "encrypt";
        }
        else{
            method = "decrypt";
        }
        callApi(files, 0, header.id, method)
    }
    else{
        alert("Please Enter the key")
    }
})

submit.addEventListener('click', async() => {
    let msg = message.value;
    let k = key.value;

    if(option.id === "encryptContainer"){
        method = "encrypt";
    }
    else{
        method = "decrypt";
    }
    if(changeId.id === 'bot'){
        k = "none"
    }
    if(header.id === "text"){
        if(msg.length > 0 && k.length > 0){
            callApi(msg, k, changeId.id, method)
            
        }
        else{
            res.innerHTML = "Enter the valid input";
        }
    }
    else if(header.id === "audio"){
        callApi(files, 0, "audio", method)
    }
    else if(header.id === "image"){
        callApi(files, 0, "image", method)
    }
    

    console.log("Clicked")

})

// Sending messages from fast2sms api to user
//TODO
// sendBtn.addEventListener('click', () => {

//     let number = document.getElementById('mobileNumber').value;
//     var settings = {
//         "async": true,
//         "crossDomain": true,
//         "url": "https://www.fast2sms.com/dev/bulkV2",
//         "method": "POST",
//         "headers": {
//         "authorization": "CRuxwKvQsVrNmn235JeT0FpGfoMkhqSItjHWZPE7a4XDBYO8d1e6UBQG4ADYE2pqwybs9hdivrRXtTfj",
//         },
//         "data": {
//         "route": "q",
//         "message": res.innerHTML,
//         "numbers": number,
//         } 
//     }

//     $.ajax(settings).done(function (response) {
//         console.log(response);
//         setTimeout(() => {
//             let status = document.createElement('div')
//             status.innerText = response.status
//             document.add.appendChild(status)
//         },3000)
//     });

// })

// sendBtn.addEventListener('click', async() => {
//     let number = document.getElementById('mobileNumber').value
//     const sendMessages = await fetch("https://www.fast2sms.com/dev/bulkV2",{
//         method : "POST",
//         headers : {
//             "authorization": "CRuxwKvQsVrNmn235JeT0FpGfoMkhqSItjHWZPE7a4XDBYO8d1e6UBQG4ADYE2pqwybs9hdivrRXtTfj",
//             "mode" : "cors"
//         },
//         body : JSON.stringify({
//             route : "q",
//             message : res.innerText,
//             numbers : number,
//         })
//     })
//     const responseFromMessage = await sendMessages.json()
//     setTimeout(() => {
//         let status = document.createElement('p')
//         status.innerHTML = responseFromMessage.status
//         sendMessageCard.add.appendChild(status)
//     }, 3000)
// })