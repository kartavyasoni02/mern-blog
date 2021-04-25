let _ = require("lodash");

const Post = require("../models/post");

exports.fetchPosts = function(req, res, next) {
  Post.find({})
    .select({})
    .limit(100)
    .sort({
      time: -1,
    })
    .exec(function(err, posts) {
      if (err) {
        console.log(err);
        return res.status(422).json({
          message: "Error! Could not retrieve posts.",
        });
      }
      res.json(posts);
    });
};

exports.createPost = function(req, res, next) {
  const title = req.body.title;
  const categories = req.body.categories;
  const content = req.body.content;
  const authorName = req.body.name;
  const time = Date.now();

  if (!title || !categories || !content) {
    return res.status(422).json({
      message: "Title, categories and content are all required.",
    });
  }

  // Create a new post
  const post = new Post({
    title: title,
    categories: _.uniq(categories.split(",").map((item) => item.trim())), // remove leading and trailing spaces, remove duplicate categories
    content: content,
    authorName: authorName,
    time: time,
  });

  // Save the post
  post.save(function(err, post) {
    // callback function
    if (err) {
      return next(err);
    }
    res.json(post); // return the created post
  });
};

exports.fetchPost = function(req, res, next) {
  Post.findById(
    {
      _id: req.params.id,
    },
    function(err, post) {
      if (err) {
        console.log(err);
        return res.status(422).json({
          message: "Error! Could not retrieve the post with the given post ID.",
        });
      }
      if (!post) {
        return res.status(404).json({
          message: "Error! The post with the given ID is not exist.",
        });
      }
      res.json(post); // return the single blog post
    }
  );
};
