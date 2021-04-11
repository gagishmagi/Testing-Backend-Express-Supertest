var express = require('express');
var router = express.Router();
var PostController = require('../controllers/PostController')

/* GET home page. */
router.get('/posts', PostController.getAll);

router.post("/posts", PostController.create);

router.get("/posts/:id", PostController.findOne);

router.patch("/posts/:id", PostController.update);

router.delete("/posts/:id", PostController.delete);


module.exports = router;
