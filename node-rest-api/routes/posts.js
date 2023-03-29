const router = require("express").Router()
const Post = require("../models/Post")
const User = require("../models/User")

// create post
router.post("/", async(req, res) => {
    const newPost = new Post(req.body)
    try{
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    }catch(err){
        res.status(500).json(err)
    }
})

// update post
router.put("/:id", async (req, res) => {

    try{
        const post = await Post.findById(req.params.id)
        if (post.userId === req.body.userId) {
            await post.updateOne({$set:req.body})
            res.status(200).json("Post successfully updated!")
        }
        else {
            res.status(403).json("You can only update your own posts!")
        }
    }catch(err){
        res.status(500).json(err)
    }
    
})

// delete post
router.delete("/:id", async (req, res) => {

    try {
        const post = await Post.findById(req.params.id)
        if (post.userId === req.body.userId) {
            await post.deleteOne({ $set: req.body })
            res.status(200).json("Post successfully deleted!")
        }
        else {
            res.status(403).json("You can only delete your own posts!")
        }
    } catch (err) {
        res.status(500).json(err)
    }

})

// like / dislike post
router.put("/:id/like", async (req, res) => {
    try{
        const post = await Post.findById(req.params.id)
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes:req.body.userId}})
            res.status(200).json("Post successfully liked!")
        } else{
            await post.updateOne({$pull:{likes:request.body.userId}})
            res.status(200).json("Post successfully unliked.")
        }
    }catch(err){
        res.status(500).json(err)
    }
})
// get a post
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (err) {
        res.status(500).json(err)
    }

})
// get timeline posts

router.get("/timeline/all", async (req, res) => {
    try {
        const currentUser = await User.findById(req.body.userId)
        const userPosts = await Post.find({userId:currentUser._id})
        const friendPosts = await Promise.all(
            currentUser.following.map(friendId=>{
                return Post.find({userId:friendId})
            })
        )
        res.json(userPosts.concat(...friendPosts))
    } catch (err) {
        res.status(500).json(err)
    }

})


module.exports = router