const router = require("express").Router();
const Post = require("../models/postModel");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
    try {
        const { name, content } = req.body;

        const newPost = new Post({
            userId: req.user,
            name,
            content
        });

        const savePost = await newPost.save();

        res.json(savePost);
    } catch (error) {
        console.log(req.user);
        res.send(500).send();
    }
});

router.get("/", auth, async (req, res) => {
    try {
        const posts = await Post.find();

        res.json(posts);
    } catch (error) {
        console.log(error);
        res.send(500).send();
    }
});

router.get("/mypost", auth, async (req, res) => {
    try {
        const posts = await Post.find({userId : req.user});

        res.json(posts);
    } catch (error) {
        console.log(error);
        res.send(500).send();
    }
});

router.route("/:id").put(auth, async (req, res) => {
    try {
        const { name, content } = req.body;

        const post = await Post.findById(req.params.id);

        if (post) {
            if (post.userId.toString() !== req.user.toString()) {
                res.status(401).json({ errorMessage: "Unauthorized" });
            }
            else {
                post.name = name;
                post.content = content;
                const updatedPost = await post.save();

                res.json(updatedPost);
            }
        }
        else {
            res.send(500).send();
        }
    } catch (error) {
        console.log(error);
        res.send(500).send();
    }
}).delete(auth, async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (post) {
        if (post.userId.toString() !== req.user.toString()) {
            res.status(401).json({ errorMessage: "Unauthorized" });
        }
        else {
            await post.remove();
            res.json({message: "Post Deleted"});
        }
    }
    else {
        res.send(500).send();
    }
});

module.exports = router;