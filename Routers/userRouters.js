const express = require('express')
const User = require('../Models/User');
const route = express.Router();
const path = require('path')
const multer = require('multer')
const fs = require('fs')


const cookieParser = require('cookie-parser');
const jsonwebtoken = require ('jsonwebtoken');
const { JsonWebTokenError } = require('jsonwebtoken');

route.use(cookieParser());




route.get('/Welcome',(req , res)=>
{
    // const path = ;
    res.sendFile(path.join(__dirname , '../Front/','LoginReg.html'))
})

// Register
route.post("/create", async function (req, res)
{
    // console.log(req.body); // btgeb data Al Form Kolha
    let data = await User.create( // b7t al data Fe Al DB
    {
        name: req.body.name,
        email: req.body.email,
        password: req.body.pass,
        age: req.body.age,
    }).then((data)=>{
        res.send("Create Successfully")
    }).catch((data)=>{
        res.send("Error")
    })
})
/*
route.post('/login',async function(req,res)
{
    
    let us= await Use.findOne({
        password:req.body.pass,
        email:req.body.email,
    })
    // res.send(us)
    if(us){
        let payload = { userId: us._id };    
        let token = jwt.sign(payload, key);
        //res.send(token);
        res.cookie('token', token, { maxAge: 900000, httpOnly: true });
        // res.cookie('token', us._id, { maxAge: 900000, httpOnly: true });
        //localStorage.setItem('token', 'token') 
        
        let pathfile=path.join(__dirname,`../Home/index.html`);
        res.sendFile(pathfile);
    }
})
*/







// let userRegister= await User.findOne({$and:[{username:req.body.username},{password:req.body.password}]})
//     let token=Jwt.sign(userRegister.username,key)
//     res.cookie('token',token, {maxAge: 360000});



// Login
route.post("/login", async function (req, res)
{
    // console.log(req.body); // btgeb data Al Form Kolha
    let data = await User.findOne( // b7t al data Fe Al DB
    {
        email: req.body.email,  
        password: req.body.pass,})
    .then((data)=>{
        if(data){
            let payload = { userId: data._id };    
            let token = jsonwebtoken.sign(payload , 'key')
            //res.send(token);
            res.cookie('token', token, { maxAge: 900000, httpOnly: true });
            
            let pathfile = path.join(__dirname, '../statics' , 'blogs.html');
            // res.redirect('/statics/blogs.html')
            res.sendFile(pathfile);
            // console.log(pathfile);
            // let pathfile2 = path.join(__dirname, '../Front/Css/blog.css');
            // res.sendFile(pathfile2);
            // let pathfile3 = path.join(__dirname, '../Front/Css/blog.js');
            // res.sendFile(pathfile3);
        }})})


        /*
    }).then((data)=>{
        // res.send(data)
        res.cookie('key',data._id ,{maxAge:15000000 , httpOnly:true})
        // console.log(data);
    }).catch((data)=>{
        res.send("Error")
    })
    // if(data){

    // }

*/



// route.get("/search/:age",async function(req,res)
// {
//     let data = await User.find({age:req.params.age})
//     res.send(data)
//     if(data)
//     {
//         res.send("Secc")
//     }
//     else
//     {
//         res.send("Erorr")
//     }
// })


module.exports=route;
