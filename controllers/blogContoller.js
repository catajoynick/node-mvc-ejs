const Blog = require("../models/blogs");
const path = require("path");

//Serves the index page
const blog_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render(path.resolve("./views/index.ejs"), {
        title: "ALL BLOGS",
        blogs: result,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
// Serves the details of each blog
const blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id).then((result) => {
    res
      .render(path.resolve("./views/details.ejs"), {
        blog: result,
        title: "BLOG DETAILS",
      })
      .catch((error) => {
        res.render(path.resolve("../views/404.ejs"));
      });
  });
};

//Serves the Create new blog page
const blog_create_get = (req, res) => {
  res.render(path.resolve("./views/CreateBlog.ejs"), {
    title: "Create a new blog",
  });
};

const blog_create_post = (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((error) => {
      console.log(error);
    });
};

const blog_delete = (req, res) => {
  const id = req.params.id;
  console.log(id);
  Blog.findByIdAndDelete(id)
    .then((result) => {
      console.log("deleted successfully");
      res.json({ redirect: "/blogs" });
    })
    .catch((error) => console.log(error));
};
module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
};
