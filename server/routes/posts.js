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
  const height = req.body.height;
  const weight = req.body.weight;
  const preferred = req.body.preferred;
  const weekFoot = req.body.weekFoot;
  const skillMove = req.body.skillMove;
  const reputation = req.body.reputation;
  const attackingWorkRate = req.body.attackingWorkRate;
  const defensiveWorkRate = req.body.defensiveWorkRate;
  const commonName = req.body.commonName;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const age = req.body.age;
  const nationality = req.body.nationality;
  const position = req.body.position;
  const potential = req.body. potential;
  const rating = req.body. rating;
  const value = req.body.value;
  const wage = req.body.wage;
  const attack_crossing = req.body.attack_crossing;
  const attack_fishing = req.body.attack_fishing;
  const attack_heading_accuracy = req.body.attack_heading_accuracy;
  const attack_short_passing = req.body.attack_short_passing;
  const attack_volleys = req.body.attack_volleys;
  const skill_dribbling = req.body.skill_dribbling;
  const skill_fk_accuracy = req.body.skill_fk_accuracy;
  const skill_long_passing = req.body.skill_long_passing;
  const skill_ball_control = req.body.skill_ball_control;
  const movement_acceleration = req.body.movement_acceleration;
  const movement_sprint_speed = req.body.movement_sprint_speed;
  const movement_agility = req.body.movement_agility;
  const movement_reactions = req.body.movement_reactions;
  const movement_balance = req.body.movement_balance;
  const power_shot_power = req.body.power_shot_power;
  const power_jumping = req.body.power_jumping;
  const power_stamina = req.body.power_stamina;
  const power_strength = req.body.power_strength;
  const power_long_shots = req.body.power_long_shots;
  const mentality_aggression = req.body.mentality_aggression;
  const mentality_Interceptions = req.body.mentality_Interceptions;
  const mentality_positioning = req.body.mentality_positioning;
  const mentality_vision = req.body.mentality_vision;
  const mentality_penalties = req.body.mentality_penalties;
  const mentality_composure = req.body.mentality_composure;
  const defending_standing_tackle = req.body.defending_standing_tackle;
  const defending_sliding_tackle = req.body.defending_sliding_tackle;
  const goalkeeping_diving = req.body.goalkeeping_diving;
  const goalkeeping_handling = req.body.goalkeeping_handling;
  const goalkeeping_kicking = req.body.goalkeeping_kicking;
  const goalkeeping_positioning = req.body.goalkeeping_positioning;
  const goalkeeping_reflexes = req.body.goalkeeping_reflexes;
  const input_team = req.body.input_team;
  const start_year = req.body.start_year;
  const end_year = req.body.end_year;
  ;

  if (
    !author ||
    !height ||
    !weight ||
    !preferred ||
    !weekFoot ||
    !skillMove ||
    !reputation ||
    !attackingWorkRate ||
    !defensiveWorkRate ||
    !commonName ||
    !firstName ||
    !lastName ||
    !age ||
    !nationality ||
    !position ||
    !potential ||
    !rating ||
    !value ||
    !attack_crossing ||
    !attack_fishing ||
    !attack_heading_accuracy ||
    !attack_short_passing ||
    !attack_volleys ||
    !skill_dribbling ||
    !skill_fk_accuracy ||
    !skill_long_passing ||
    !skill_ball_control ||
    !movement_acceleration ||
    !movement_sprint_speed ||
    !movement_agility ||
    !movement_reactions ||
    !movement_balance ||
    !power_shot_power ||
    !power_jumping ||
    !power_stamina ||
    !power_strength ||
    !power_long_shots ||
    !mentality_aggression ||
    !mentality_Interceptions ||
    !mentality_positioning ||
    !mentality_vision ||
    !mentality_penalties ||
    !mentality_composure ||
    !defending_standing_tackle ||
    !defending_sliding_tackle ||
    !goalkeeping_diving ||
    !goalkeeping_handling ||
    !goalkeeping_kicking ||
    !goalkeeping_positioning ||
    !goalkeeping_reflexes ||
    !input_team ||
    !start_year ||
    !end_year
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
      height,
      weight,
      preferred,
      weekFoot,
      skillMove,
      reputation,
      attackingWorkRate,
      defensiveWorkRate,
      commonName,
      firstName,
      lastName,
      age,
      nationality,
      position,
      potential,
      rating,
      value,
      wage,
      attack_crossing,
      attack_fishing,
      attack_heading_accuracy,
      attack_short_passing,
      attack_volleys,
      skill_dribbling,
      skill_fk_accuracy,
      skill_long_passing,
      skill_ball_control,
      movement_acceleration,
      movement_sprint_speed,
      movement_agility,
      movement_reactions,
      movement_balance,
      power_shot_power,
      power_jumping,
      power_stamina,
      power_strength,
      power_long_shots,
      mentality_aggression,
      mentality_Interceptions,
      mentality_positioning,
      mentality_vision,
      mentality_penalties,
      mentality_composure,
      defending_standing_tackle,
      defending_sliding_tackle,
      goalkeeping_diving,
      goalkeeping_handling,
      goalkeeping_kicking,
      goalkeeping_positioning,
      goalkeeping_reflexes,
      input_team,
      start_year,
      end_year
      )
    );
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: `Player unable to be added: ` + e });
  }
});
module.exports = router;
