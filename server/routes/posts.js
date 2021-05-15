const express = require("express");
const router = express.Router();
const data = require("../data");
const postsData = data.posts;

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
