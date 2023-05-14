const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
    author:  Object,
        // required: true
    // tags: {
    //     type: [String]
    // },
    // userID: Object,
},
{
    strict:false,
versionKey :false,
    
})


const Blog = mongoose.model('blogs', blogSchema)

    // Blog.create({
    //     title: 'My Blog Title2',
    //     body: 'My blog body2',
    //     imageURL: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww..com%2Ffree-photos-vectors%2Favatar&psig=AOvVaw3FF9zn9LSiDZ9AeAi1CB6w&ust=1683484135948000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCNCvhaCp4f4CFQAAAAAdAAAAABAE',
    //     author: 'abdo',
    //     tags: ['tag4', 'tag5', 'tag6']
    // })

module.exports=Blog;