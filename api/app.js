const fs = require('fs')
const express = require('express')
const multer = require('multer')
const moment = require('moment')
const cors = require('cors')
const app = express()

const upload = multer({ 
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      let path = `../uploads/${req.id}`

      if(!fs.existsSync(path)) {
        fs.mkdirSync(path)
      }

      cb(null, path)
    },
    filename: (req, file, cb) => cb(null, file.originalname)
  })
})

app.use(cors())

app.use((req, res, next) => {
  req.id = moment().format('YYYY-MM-DD hh:mm:ss')
  next()
})

app.post('/upload', upload.array('rules'), (req, res) => {
  console.log(req.files)
  res.send('ok')
})

app.listen(3001)
