const express = require("express");
const port = 3000;
const path = require("path");
const morgan = require("morgan");
const mongoose = require("mongoose");
const { result } = require("lodash");
const { compile, render } = require("ejs");
const blogsRoute = require("./routes/blogRoutes");
const aboutRoutes = require("./routes/aboutRoutes");

// Express app
const app = express();
/**
 * Connection string to mongodb
 */
const dbURI =
  "mongodb+srv://nickskiejoy:nickskiejoy@node-crud-project.4t0sv.mongodb.net/node-crud-project?retryWrites=true&w=majority";

/**
 * Connects to the database via mongoose
 */

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected succesfully");
    /**
     * Listens to port 3000
     */
    app.listen(port);
  })
  .catch((error) => console.log(error));

/**
 * SERVING STATIC FILES
 */
app.use(express.static(path.resolve("./views/css")));
app.use(express.static(path.resolve("./views/js")));
app.use(express.urlencoded({ extended: true }));

/**
 * This is used to log user
 */
app.use(morgan("dev"));

/**
 * Sets the view engine to ejs
 */
app.set("view engine", "ejs");

//============================  ROUTES    ======================================//
app.get("/", (req, res) => {
  res.redirect("/blogs");
});
/**
 * This is the /blogs routes
 */
app.use("/blogs", blogsRoute);
/**
 * This is the /about routes
 */
app.use(aboutRoutes);
/**
 * If not route matched 404 page will be sent.
 */
app.use((req, res) => {
  res.render(path.resolve("./views/404.ejs"), { title: "Error 404" });
});
