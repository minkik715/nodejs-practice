const express = require('express')
const mongoose = require('mongoose')
const app = express()
const bodyParser = require('body-parser')
const { User } = require('./models/user')
const config = require('./config/key')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

mongoose.connect(config.mongoURI, {
     useUnifiedTopology: true
}).then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err))
const port = 3000



app.get('/', (req, res) => res.send('Hello World!'))

app.post('/register', (req, res) => {
     const user = new User(req.body)
     user.save((err, doc) => {
          if(err) return res.json({success: false, err})
          return res.status(200).json({success: true, doc})
     })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

