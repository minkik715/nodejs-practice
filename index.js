const express = require('express')
const mongoose = require('mongoose')
const app = express()
const bodyParser = require('body-parser')
const {User} = require('./models/user')
const config = require('./config/key')
const cookieParser = require('cookie-parser')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser())
mongoose.connect(config.mongoURI, {
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err))
const port = 3000


app.get('/', (req, res) => res.send('Hello World!'))

app.post('/register', (req, res) => {
    const user = new User(req.body)
    user.save((err, doc) => {
        if (err) return res.json({success: false, err})
        return res.status(200).json({success: true, doc})
    })
})

app.post('/login', (req, res) => {
    User.findOne({email: req.body.email}, (err, userInfo) => {
        console.log(123)
        if (!userInfo) {
            return res.json({
                loginSuccess: false,
                message: "존재하지 않은 이메일입니다."
            })
        }
        console.log(123)
        userInfo.comparePassword(req.body.password, (err, isMatch) => {
            console.log(123)
            if (!isMatch) {
                return res.js({
                    loginSuccess: false,
                    message: "옳지 않은 비밀번호 입니다."
                })
            }
            userInfo.generateToken((err, user) => {
                if(err) return res.status(400).send(err);
                res.cookie('token', user.token)
                    .status(200)
                    .json({
                        loginSuccess: true,
                        user : user
                    })
            })
        })
        })
    })

    app.listen(port, () => console.log(`Example app listening on port ${port}!`))

