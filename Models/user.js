// const { strict } = require('assert');
const mongoose = require('mongoose');  // Bnady Al Mongoose
// const { version } = require('os');

const userSchema = mongoose.Schema({
    name:{
        required : true,
        type : String
    },
    email:{
        required : true,
        type : String,
        unique : true
    },
    password:{
        required : true,
        type : String
    },
    age:{
        required: true,
        type: String
    }
    // role:{
    //     type : String,
    //     default : 'user',
    //     enum:{
    //         value:["admin","user"],
    //         message:'{VALUE} is not supported',
    //     }
    // }
},
{
    strict : false,
    versionKey:false,
});


const User=mongoose.model('users',userSchema); // Create Collection
// User.create({
//     name: 'Abdo',
//     email: 'abdelrahman',
//     password:'aaaa',
//     age:25
// })
module.exports=User; // Ay 7d Mmkn Ynadeh


