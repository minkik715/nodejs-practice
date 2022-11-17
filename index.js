const express = require('express')
const mongoose = require('mongoose')
const app = express()
mongoose.connect('mongodb://localhost:27017', {
     useUnifiedTopology: true
}).then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err))
const port = 3000



app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))