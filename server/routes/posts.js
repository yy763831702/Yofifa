const express = require("express");
const router = express.Router();
const data = require("../data");
const postsData = data.posts;

router.get("/users/:authorid", async (req, res) => {
  console.log("1")
  if (!req.params.authorid) {
    res.status(400).json({ error: "Must include an id" });
  }
  try {
    const posts = await postsData.getPostsByUser(req.params.authorid);
    res.json(posts);
  } catch (e) {

    console.log(e);
    res.status(404).json({ error: "No posts found for this user" });
  }
});

router.get("/:id", async (req, res) => {
  console.log("2")
  if (!req.params.id) {
    res.status(400).json({ error: "Must include an id" });
  }
  try {
    const post = await postsData.getPostById(req.params.id);
    res.json(post);
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: "Post not found" });
  }
});

router.post("/", async (req, res) => {
  console.log("we are in post route")

  const author = req.body.author;
  const commonName = req.body.commonName;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const potential = req.body.potential;
  const rating = req.body.rating;
  if (
    !author||
    !commonName ||
    !firstName ||
    !lastName ||
    !potential ||
    !rating
  ) {
    res.status(400).json({
      error:
        "You must include all the data.",
    });
  }
  try {
    res.json(
      await postsData.addPost(
        author,
        commonName,
        firstName,
        lastName,
        potential,
        rating
      )
    );
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: `Player unable to be added: ` + e });
  }
});
module.exports = router;
