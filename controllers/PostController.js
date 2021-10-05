const Post = require('../models/Post');

exports.getAll = async function (req, res, next) {
    try {
        const posts = await Post.find();
        res.status(200).send(posts)
    } catch (error) {
        res.status(500).send(error.message)
    }

}

exports.findOne = async function (req, res) {
    try {
        const post = await Post.findOne({
            _id: req.params.id
        });
        res.send(post);
    } catch {
        res.status(404);
        res.send({
            error: "Post doesn't exist!"
        });
    }
}

exports.create = async function (req, res) {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
    });
    await post.save();
    post.id = post._id;
    res.send(post);
}

exports.update = async function (req, res)  {
    try {
        const post = await Post.findOne({
            _id: req.params.id
        });

        if (req.body.title) {
            post.title = req.body.title;
        }

        if (req.body.content) {
            post.content = req.body.content;
        }

        await post.save();
        res.send(post);
    } catch {
        res.status(404);
        res.send({
            error: "Post doesn't exist!"
        });
    }
}

exports.delete = async function (req, res) {
    try {
        await Post.deleteOne({
            _id: req.params.id
        });
        res.status(204).send();
    } catch {
        res.status(404);
        res.send({
            error: "Post doesn't exist!"
        });
    }
}
