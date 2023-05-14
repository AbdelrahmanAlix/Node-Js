
// All Require
require('./config/Connected'); //Conntion DB
const express = require('express')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const app = express();
const port = 3000;
const path = require('path')
const cors = require('cors') // to open Server To Anaghtr Server
// const todoRoute = require('./Routers/');
const userRoute = require('./Routers/userRouters');
const blogRoute = require('./Routers/blogRouters');

// All Require

// midellware
app.use(express.static(path.join(__dirname,'statics')))

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/user',userRoute);
app.use('/blog',blogRoute);

    // app.get('/bloghome',(req,res)=>{
    //     res.sendFile(path.join(__dirname,'/Front','blogs.html'))
    //     })
// midellware


// app.get('/login',(req , res)=>
// {
//     const path = path.join(__dirname , './Front/','LoginReg.html');
//     res.sendFile(path)
// })











app.listen(port, () =>  console.log(`Example App ${port}!`))
