const express = require('express');
const Blog = require('../Models/blog');
// const Users = require('../Models/user');
const User = require('../Models/User');

const multer  = require('multer')
const bodyParser = require('body-parser')
const path = require('path')
const jwt = require ('jsonwebtoken')
const cookieParser = require('cookie-parser');
const key = "keystring"
const route = express.Router();
route.use(cookieParser())

// 
const filestorage=multer.diskStorage({
    destination:(req,file,callbackfun)=>{
    //   console.log(req,file);
      callbackfun(null,'./statics/uploads')
    },
    filename:(req,file,cb)=>{
      cb(null,Date.now()+"-"+file.originalname.replaceAll(" ",''))
    }
  })
  const upload=multer({storage:filestorage});
//

// Login
route.get('/showblog', async function (req, res) {
    let data = await Blog.find();
    if (data) {
        res.send(data);
    }
    else {
        res.status(404).send('not found');
    }
});
route.get('/display',(req , res)=>
{
    res.sendFile(path.join(__dirname,'../statics','blogs.html'))
})


route.post('/blogpage',upload.single('img'),bodyParser.urlencoded({extended:false }),async function(req,res)
{ 
    let xxx= jwt.verify(req.cookies.token,'key')
    let info = await User.findOne({_id:xxx.userId})
    let addPost= await Blog.create({
    title:req.body.tit,
    body:req.body.bod,
    imageURL:req.file.filename,
    author:info,

})
res.redirect("/blog/display")
});







// Post
// route.post('/blogpage', upload.single('img'),bodyParser.urlencoded({extended:false}) ,async (req, res) =>
// {
//     // console.log(req.body); // btgeb data Al Form Kolha
//     let usernameToken=Jwt.verify(req.cookies.token,key)

//     let info = await User.findOne({username:usernameToken})
//     let data =  await Blog.create( // b7t al data Fe Al DB
//     {
//         title: req.body.tit,
//         body: req.body.bod,
//         author: req.body.auth,
//         imageURL: req.file.filename
//     })
//     if (data) {
//         res.redirect('/blog/display');
//         }
//     else {
//         res.status(404).send('not found');
//     }
// })

// Search
////////////////////////////////////////////////////////
route.get('/search/:title',async (req,res)=>{
    try{
        const q=req.params.title;
        const blog=await Blog.find({
            $or: [
                { title: { $regex: q, $options: 'i' } },
              ]
        })
        if (blog.length > 0) {
            res.json(blog);
          } else {
            res.status(404).json({ message: 'Blog not found' });
          }
    }catch (err) {
        // console.error(err);
        // res.status(500).json({ message: 'Internal server error' });
      }
})
/////////////////////////////////////////////


route.delete('/delete/:id' , async (req , res)=>{
    let data = await Blog.deleteOne({_id : req.params.id});
    res.send(data)
})







route.get('/showw',(req , res)=>
{
    res.sendFile(path.join(__dirname,'../statics','blogs.html'))
})

route.get('/show',(req , res)=>
{
    res.sendFile(path.join(__dirname,'../statics','blog-user.html'))
})



route.get('/bloguser', async(req , res)=>
{
    let payload = jwt.verify(req.cookies.token, 'key');
    // let authorId = payload.userId;
    let us = await User.findById(payload.userId)
    let data = await Blog.find({"author._id": us._id});

        res.sendFile(path.join(__dirname,'../statics','blog-user.html'))
        res.send(data);
})
/////////////
// route.get("/bloguser", async function (req, res) {

  
//     try {
//         let payload = jwt.verify(token, 'key');
//         // let xxx= jwt.verify(req.cookies.token,'key')

//       let authorId = payload.userId;
//         // let info = xxx.userId

  
//       const author = await User.findById(authorId);
//       if (!author) {
//         return res.status(401).send('Access denied. Invalid token.');
//       }
  
//       let blogs = await Blog.find({ author: User });
//       console.log(author);
//       if (blogs && blogs.length > 0) {
//         res.send(blogs);
//       } else {
//         res.status(404).send("No blogs found for this author");
//       }
//     } catch (err) {
//       console.error(err);
//       res.status(500).send('Internal server error');
//     }
//   });












// ////////

route.get('/getblogData/:id',async(req,res)=>{
    let blogData=await Blog.findOne({_id:req.params.id})
    if(blogData){
        res.send(blogData)
    }
})

route.put('/updateBlog/:id',async function(req,res)
{
  let update= await Blog.findByIdAndUpdate(req.params.id,req.body);
//   res.redirect('/createPost')
//   res.send(update);
})








module.exports = route;
