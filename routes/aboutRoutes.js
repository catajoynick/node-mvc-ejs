const express = require("express");
const router = express();
const path = require("path");
const { model } = require("../models/blogs");

/**
 *
 * ROUTES TO /about
 *
 */
router.get("/about", (req, res) => {
  res.render(path.resolve("./views/about"), { title: "About page" });
});

/**
 * Redirects to /about page
 */
router.get("/about-us", (req, res) => {
  res.redirect("/about");
});

module.exports = router;
