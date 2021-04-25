const Blog = require("./controllers/blog");

module.exports = function(app) {
  app.get("/api/posts", Blog.fetchPosts);

  app.post("/api/posts", Blog.createPost); //

  app.get("/api/posts/:id", Blog.fetchPost);
};
