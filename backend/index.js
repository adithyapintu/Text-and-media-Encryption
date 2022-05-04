const express = require('express')
const { response } = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const MongoDBSession = require('connect-mongodb-session')(session)
const bcrypt = require('bcryptjs')
const UserModel = require('./models/User')
var ejs = require('ejs')
const app = express()
const port = 8080

app.use(express.json())

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended : true}))
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/jsFile', express.static(__dirname + 'public/jsFile'))
app.use('/images', express.static(__dirname + 'public/images'))
app.use('/assets', express.static(__dirname + 'public/assets'))

app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET')
    next()
})

const dbstring = "mongodb://localhost:27017/hags"

mongoose.connect(dbstring, {
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(() => {
    console.log("Mongo Connected")
})

const store = new MongoDBSession({
    uri : dbstring,
    collection : 'hagsDataBase'
})

app.use(session({
    secret : "key",
    resave : false,
    saveUninitialized : false,
    store : store
}))

const isAuth = (req, res, next) => {
    if(req.session.isAuth) {
        // return res.redirect('/logged')
        next()
    }
    else{
        res.redirect('/')
    }
}

const isLogged = (req,res, next) => {
    if(req.session.isAuth) {
        res.redirect('/logged')
    }
    else{
        next()
    }
}

app.get('/',isLogged, (req, res) => {
    // return res.redirect('/maintain')
    res.render("login.ejs")
})

app.get('/maintain', (req, res) => {
    res.redirect("/")
    res.render("maintainance.ejs")
})

app.get('/logged', isAuth ,(req, res) => {
    res.render("main.ejs")
})

app.use('/api/aes', require('./routes/aes'))
app.use('/api/tdes', require('./routes/tdes'))
// app.use('/api/bot', require('./routes/bot'))

app.post('/login', async (req, res) => {
    const {email, password} = req.body
    let user = await UserModel.findOne({email})
    if(!user){

        return res.redirect('/')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    
    if(!isMatch){
        return res.redirect('/')
    }

    req.session.isAuth = true

    res.redirect('/logged')

})

app.post('/register', async (req, res) => {
    const {name, email, password, phonenumber} = req.body

    let user = await UserModel.findOne({email})

    if(user) {

        return res.redirect('/')

    }

    const encPassword = await bcrypt.hash(password, 12)

    user = new UserModel({
        name,
        email,
        password : encPassword,
        phonenumber
    })

    await user.save()
    res.isAuth = true
    res.redirect('/logged')

})

app.post('/logout', (req, res) => {

    req.session.destroy((err) => {

        if(err) throw(err)

    })

    return res.redirect('/')

})

app.listen(port, () => {

    console.log("Listening at http://localhost:8080")

})