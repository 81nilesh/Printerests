var express = require('express');
var router = express.Router();
const userModel = require("./users");
const postModel = require("./post");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/alluserposts', async function (req, res, next) {
  let user = await userModel
    .findOne({ _id: "657447b8597b850cfc02de81" })
    .populate('posts')
  res.send(user);
})

router.get("/createuser", async function (req, res, next) {
  let createuser = await userModel.create({
    username: "Nilesh",
    password: "ankit",
    posts: [],
    email: "ankitchoudhary8120@gmail.com",
    fullname: "Nilesh kumar choudhary",
  });

  res.send(createuser);
});

router.get('/createpost', async function (req, res, next) {
  let createdpost = await postModel.create({
    postText: "Hello kaise ho saare",
    user: "657447b8597b850cfc02de81"
  });
  let user = await userModel.findOne({ _id: "657447b8597b850cfc02de81" })
  user.posts.push(createdpost._id);
  await user.save();
  res.send("done");
})
module.exports = router;
