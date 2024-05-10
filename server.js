import express from 'express';
import nodemailer from 'nodemailer';
import otpGenerator from 'otp-generator';
import mongoose from 'mongoose';
import { user } from './models/user.js'
// import fs from 'fs';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
const app = express();
var OTP;


app.listen(3000, () => console.log('listening on port 3000'))

app.use(express.static("public"))

app.use(express.json())
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/chattterhub');
}


app.post('/data', (req, res) => {

 console.log("--//---//---//---//--sign in--//---//---//---//--")

  console.log(req.body.email)

  user.findOne({ Name: req.body.name })
  .then(data => {
    
   
    if(data !== null){
      res.json(false)
     
    }else{
      const email = req.body.email

      OTP = otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
      console.log("Generated:", OTP);
    
      let mail = 'Your 4 digit OTP is ' + OTP;
      console.log(mail);
    
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'dev.Bold2006@gmail.com',
          pass: 'csnc qzqp zfpq dogh'
        }
      });
    
      var mailOptions = {
        from: 'codeboldy',
        to: email,
        subject: 'OTP for chatterhub sign in ',
        text: mail
      };
    
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
        res.json(true)
      });
    } 
  })

  

})

app.post('/data/check', (req, res) => {

  console.log("-//--//---//---//-otp check--//---//----//--//-")

  console.log(req.body);

  let responseData = { message: 'false' };

  if (OTP == req.body.otp) {

    responseData = { message: 'true' };
    const USER = new user({
      Email: req.body.email,
      Name: req.body.name,
      Password: req.body.password
    });
    USER.save();

  }
  res.json(responseData)
 })

   app.post('/login', (req, res) => {

    console.log("--//--//--//--//--log in--//---//---//---//--")

  console.log(req.body)

  user.findOne({ Name: req.body.name, Password:req.body.password })
  .then(data => {
    console.log(data);
    res.json(data);
  })
  .catch(err => {
    console.error(err);
  });
 })
 
 app.post('/search', (req, res) => {
  console.log(req.body);
  user.findOne({ Name: req.body.name })
 .then(data => {
   console.log(data);
   if(data!== null){
     res.json(data.Name);
    }else{
      res.json(data)
    }   
  })
  .catch(err => {
    console.error(err);
  });
 })