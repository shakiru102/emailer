const express = require('express')
const sendGrid = require('@sendgrid/mail')
const app = express()
require('dotenv').config()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

sendGrid.setApiKey(process.env.SEND_GRID)

app.post('/sendmail', (req, res) => {
  const { email, subject, text } = req.body
  const options = {
    from: process.env.EMAIL,
    to: email,
    subject: `This is a Developer Testing Account (${subject})`,
    html: `
    <div style="padding-bottom: 6px">
     <h1>
     ${text}
     </h1>
     <a href="https://emailerstmp.herokuapp.com" style="text-decoration: none; padding: 5px 8px; color: white; background-color: blue; border-radius: 5px;" > VISIT SITE </a>
     </div>
     `
  }

  
  sendGrid.send(options)
  .then((msg) => {
    res.status(200).send('ok')})
  .catch(err => {
    console.log(err.message)
    res.status(400).send('Falied')})
})

module.exports = app
