import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../firebase/Auth";
import API from "../API";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

import "../App.css";

function CreatePlayer() {
  const [postData, setPostData] = useState({});
  const { currentUser } = useContext(AuthContext);

  const [submitted, setSubmitted] = useState(false);
  const [image, setImage] = useState("empty");
  const handleImageUpload = (event) => {
    event.preventDefault();
    let data = new FormData();
    data.append("file", event.target.files[0]);
    console.log(data)
    setImage(data);
  };

  const formSubmit = async (event) => {
    event.preventDefault();
    let height = document.getElementById("post_height").value;
    let weight = document.getElementById("post_weight").value;
    let preferred = document.getElementById("select-preferred-foot").value;
    let weekFoot = document.getElementById("select-weak-foot").value;
    let skillMove = document.getElementById("select-skill-move").value;
    let reputation = document.getElementById("select-internation-reputation").value;
    let attackingWorkRate = document.getElementById("select-attacking-work-rate").value;
    let defensiveWorkRate = document.getElementById("select-defensive-work-rate").value;

    let commonName = document.getElementById("commonName").value;
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let age = document.getElementById("age").value;
    let nationality = document.getElementById("nationality").value;
    let position = document.getElementById("position").value;
    let potential = document.getElementById("potential").value;
    let rating = document.getElementById("rating").value;
    let value = document.getElementById("create_value").value;
    let wage = document.getElementById("create_value").value;

    let attack_crossing = document.getElementById("attack-crossing").value;
    let attack_fishing = document.getElementById("attack-fishing").value;
    let attack_heading_accuracy = document.getElementById("attack-heading-accuracy").value;
    let attack_short_passing = document.getElementById("attack-short-passing").value;
    let attack_volleys = document.getElementById("attack-volleys").value;
    let skill_dribbling = document.getElementById("skill-dribbling").value;
    let skill_fk_accuracy = document.getElementById("skill-fk-accuracy").value;
    let skill_long_passing= document.getElementById("skill-long-passing").value;
    let skill_ball_control = document.getElementById("skill-ball-control").value;
    let movement_acceleration = document.getElementById("movement-acceleration").value;
    let movement_sprint_speed = document.getElementById("movement-sprint-speed").value;
    let movement_agility = document.getElementById("movement-agility").value;
    let movement_reactions = document.getElementById("movement-reactions").value;
    let movement_balance = document.getElementById("movement-balance").value;
    let power_shot_power = document.getElementById("power-shot-power").value;
    let power_jumping = document.getElementById("power-jumping").value;
    let power_stamina = document.getElementById("power-stamina").value;
    let power_strength = document.getElementById("power-strength").value;
    let power_long_shots = document.getElementById("power-long-shots").value;
    let mentality_aggression = document.getElementById("mentality-aggression").value;
    let mentality_Interceptions = document.getElementById("mentality-Interceptions").value;
    let mentality_positioning = document.getElementById("mentality-positioning").value;
    let mentality_vision = document.getElementById("mentality-vision").value;
    let mentality_penalties = document.getElementById("mentality-penalties").value;
    let mentality_composure = document.getElementById("mentality-composure").value;
    let defending_standing_tackle = document.getElementById("defending-standing-tackle").value;
    let defending_sliding_tackle = document.getElementById("defending-sliding-tackle").value;
    let goalkeeping_diving = document.getElementById("goalkeeping-diving").value;
    let goalkeeping_handling = document.getElementById("goalkeeping-handling").value;
    let goalkeeping_kicking = document.getElementById("goalkeeping-kicking").value;
    let goalkeeping_positioning = document.getElementById("goalkeeping-positioning").value;
    let goalkeeping_reflexes = document.getElementById("goalkeeping-reflexes").value;
    let input_team = document.getElementById("input-team").value;
    let start_year = document.getElementById("start-year").value;
    let end_year = document.getElementById("end-year").value;

    let newPost = {
      author: currentUser && currentUser.uid,
      height: height,
      weight:weight,
      preferred: preferred,
      weekFoot:weekFoot,
      skillMove:skillMove,
      reputation:reputation,
      attackingWorkRate:attackingWorkRate,
      defensiveWorkRate:defensiveWorkRate,
      commonName: commonName,
      firstName: firstName,
      lastName: lastName,
      age:age,
      nationality:nationality,
      position:position,
      potential: potential,
      rating: rating,
      value:value,
      wage:wage,
      attack_crossing:attack_crossing,
      attack_fishing:attack_fishing,
      attack_heading_accuracy:attack_heading_accuracy,
      attack_short_passing:attack_short_passing,
      attack_volleys:attack_volleys,
      skill_dribbling:skill_dribbling,
      skill_fk_accuracy:skill_fk_accuracy,
      skill_long_passing:skill_long_passing,
      skill_ball_control:skill_ball_control,
      movement_acceleration:movement_acceleration,
      movement_sprint_speed:movement_sprint_speed,
      movement_agility:movement_agility,
      movement_reactions:movement_reactions,
      movement_balance:movement_balance,
      power_shot_power:power_shot_power,
      power_jumping:power_jumping,
      power_stamina:power_stamina,
      power_strength:power_strength,
      power_long_shots:power_long_shots,
      mentality_aggression:mentality_aggression,
      mentality_Interceptions:mentality_Interceptions,
      mentality_positioning:mentality_positioning,
      mentality_vision:mentality_vision,
      mentality_penalties:mentality_penalties,
      mentality_composure:mentality_composure,
      defending_standing_tackle:defending_standing_tackle,
      defending_sliding_tackle:defending_sliding_tackle,
      goalkeeping_diving:goalkeeping_diving,
      goalkeeping_handling:goalkeeping_handling,
      goalkeeping_kicking:goalkeeping_kicking,
      goalkeeping_positioning:goalkeeping_positioning,
      goalkeeping_reflexes:goalkeeping_reflexes,
      input_team:input_team,
      start_year:start_year,
      end_year:end_year
    };

    const { data } = await API.post("/posts", newPost);
    // let postId = data._id;
    if (image !== "empty") {
      console.log("IMAGE DETECTED");
      const { imageResult } = await API.post("/images/" + currentUser.uid +'/'+ data._id, image, {
        headers: {
          "Content-Type": "multipart/form-data, boundary=${form._boundary}",
        },
      });
    } else {
      console.log("NO IMAGE DETECTED");
    }
    setPostData(data);
    setSubmitted(true);
  };

  if (submitted) {
    console.log("Submitted post");
    console.log(postData);
    if (postData && postData._id)
      if (!alert("Your post has been added.")) {
        console.log("yeah")
        return <Redirect to={`/posts/users/${currentUser.uid}`} />;
        console.log("yeah")
      }
    else alert("Could not add post, please try again");
  }
  return (
      <Container>

      <Form onSubmit={formSubmit}>
      <Row>
      <Col sm={4}>
        <ul>
        <li>
        <label>Height:
        <input type="number" required id="post_height" name="post_height" placeholder="cm"/>
        </label>
        </li>
        <label>Weight:
        <input type="number" required id="post_weight" name="post_weight" placeholder="kg"/>
        </label>
        <li>
        <label>Preferred Foot
        <select id = 'select-preferred-foot'>
          <option value="Left">Left</option>
          <option selected value="Right">Right</option>
        </select>
        </label>
        </li>
        <li>
        <label>Weak Foot
        <select id = 'select-weak-foot'>
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        </label>
        </li>
        <li>
        <label>Skill Move
        <select id = 'select-skill-move'>
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        </label>
        </li>
        <li>
        <label>International Reputation
        <select id = 'select-internation-reputation'>International Reputation
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        </label>
        </li>
        <li>
        <label>Attacking Work Rate
        <select id = 'select-attacking-work-rate'>
          <option value="Low">Low</option>
          <option selected value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        </label>
        </li>
        <li>
        <label>Defensive Work Rate
        <select id = 'select-defensive-work-rate'>
          <option value="Low">Low</option>
          <option selected value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        </label>
        </li>
        </ul>
      </Col>
      <Col sm={8}>
        <img alt="" src="imgs/notfound_0_120.webp"></img>
        <label>
        <input type="file" formEncType="multipart/form-data" id="post-image" name="post-image" onChange={handleImageUpload} accept="image/jpeg, image/jpg, image/png"/>
        </label>
        <label>
        <input type="text" id="commonName" name="commonName" placeholder="Common Name"/>
        </label>
        <label>
        <input type="text" id="firstName" name="firstName" placeholder="First Name"/>
        </label>
        <label>
        <input type="text" id="lastName" name="lastName" placeholder="Last Name"/>
        </label>
        <label>
        <input type="number" required id="age" name="age" placeholder="Age"/>
        </label>
        <div>
        <label>
        <input type="text" required id='nationality' name="nationality" placeholder="Nationality"/>
        </label>
        <label>
        <input type="text" required id='position' name="position" placeholder="Position"/>
        </label>
        <label>Rating
        <input type="number" required id='potential' name="potential" max="99" min="0"/>
        </label>
        <label>Potential
        <input type="number" required id='rating' name="rating"/>
        </label>
        <label>Value: $
        <input type="number" required id='create_value' name="value"/>
        </label>
        <label>Wage: $
        <input type="number" required id='create_wage' name="wage"/>
        </label>
        </div>
      </Col>
      </Row>

      <div className='player-ability'>
          <div className='player-ability-card'>
              <h5>Attacking</h5>
              <ul>
                  <li>
                      <label>
                      <input type = "number" required id = 'attack-crossing' name ='attack-crossing' max = "99" min = "0"/>
                      Crossing</label>
                  </li>
                  <li>
                      <label>
                        <input type = "number" required id = 'attack-fishing' name ='attack-fishing' max = "99" min = "0"/>
                      Finishing</label>
                  </li>
                  <li>
                      <label>
                        <input type = "number" required id = 'attack-heading-accuracy' name ='attack-heading-accuracy' max = "99" min = "0"/>
                      Heading Accuracy</label>
                  </li>
                  <li>
                      <label>
                        <input type = "number" required id = 'attack-short-passing' name ='attack-short-passing' max = "99" min = "0"/>
                      Short Passing</label>
                  </li>
                  <li>
                      <label>
                        <input type = "number" required id = 'attack-volleys' name ='attack-volleys' max = "99" min = "0"/>
                      Volleys</label>
                  </li>
              </ul>
          </div>
          <div className='player-ability-card'>
              <h5>Skill</h5>
              <ul>
                  <li>
                      <label>
                        <input type = "number" required id = 'skill-dribbling' name ='skill-dribbling' max = "99" min = "0"/>
                      Dribbling</label>
                  </li>
                  <li>
                      <label>
                      <input type = "number" required id = 'skill-curve' name ='skill-curve' max = "99" min = "0"/>
                      Curve</label>
                  </li>
                  <li>
                      <label>
                      <input type = "number" required id = 'skill-fk-accuracy' name ='skill-fk-accuracy' max = "99" min = "0"/>
                      FK Accuracy</label>
                  </li>
                  <li>
                      <label>
                      <input type = "number" required id = 'skill-long-passing' name ='skill-long-passing' max = "99" min = "0"/>
                      Long Passing</label>
                  </li>
                  <li>
                      <label>
                      <input type = "number" required id = 'skill-ball-control' name ='skill-ball-control' max = "99" min = "0"/>
                      Ball Control</label>
                  </li>
              </ul>
          </div>
          <div className='player-ability-card'>
              <h5>Movement</h5>
              <ul>
                  <li>
                      <label>
                      <input type = "number" required id = 'movement-acceleration' name ='movement-acceleration' max = "99" min = "0"/>
                      Acceleration</label>
                  </li>
                  <li>
                      <label>
                      <input type = "number" required id = 'movement-sprint-speed' name ='movement-sprint-speed' max = "99" min = "0"/>
                      Sprint Speed</label>
                  </li>
                  <li>
                      <label>
                      <input type = "number" required id = 'movement-agility' name ='movement-agility' max = "99" min = "0"/>
                      Agility</label>
                  </li>
                  <li>
                      <label>
                      <input type = "number" required id = 'movement-reactions' name ='movement-reactions' max = "99" min = "0"/>
                      Reactions</label>
                  </li>
                  <li>
                      <label>
                      <input type = "number" required id = 'movement-balance' name ='movement-balance' max = "99" min = "0"/>
                      Balance</label>
                  </li>
              </ul>
          </div>
          <div className='player-ability-card'>
              <h5>Power</h5>
              <ul>
                  <li>
                      <label>
                      <input type = "number" required id = 'power-shot-power' name ='power-shot-power' max = "99" min = "0"/>
                      Shot Power</label>
                  </li>
                  <li>
                      <label>
                      <input type = "number" required id = 'power-jumping' name ='power-jumping' max = "99" min = "0"/>
                      Jumping</label>
                  </li>
                  <li>
                      <label>
                      <input type = "number" required id = 'power-stamina' name ='power-stamina' max = "99" min = "0"/>
                      Stamina</label>
                  </li>
                  <li>
                      <label>
                      <input type = "number" required id = 'power-strength' name ='power-strength' max = "99" min = "0"/>
                      Strength</label>
                  </li>
                  <li>
                      <label>
                      <input type = "number" required id = 'power-long-shots' name ='power-long-shots' max = "99" min = "0"/>
                      Long Shots</label>
                  </li>
              </ul>
          </div>
          <div className='player-ability-card'>
              <h5>Mentality</h5>
              <ul>
                  <li>
                      <label>
                      <input type = "number" required id = 'mentality-aggression' name ='mentality-aggression' max = "99" min = "0"/>
                      Aggression</label>
                  </li>
                  <li>
                      <label>
                      <input type = "number" required id = 'mentality-Interceptions' name ='mentality-Interceptions' max = "99" min = "0"/>
                      Interceptions</label>
                  </li>
                  <li>
                      <label>
                      <input type = "number" required id = 'mentality-positioning' name ='mentality-positioning' max = "99" min = "0"/>
                      Positioning</label>
                  </li>
                  <li>
                      <label>
                      <input type = "number" required id = 'mentality-vision' name ='mentality-vision' max = "99" min = "0"/>
                      Vision</label>
                  </li>
                  <li>
                      <label>
                      <input type = "number" required id = 'mentality-penalties' name ='mentality-penalties' max = "99" min = "0"/>
                      Penalties</label>
                  </li>
                  <li>
                      <label>
                      <input type = "number" required id = 'mentality-composure' name ='mentality-composure' max = "99" min = "0"/>
                      Composure</label>
                  </li>
              </ul>
          </div>
          <div className='player-ability-card'>
              <h5>Defending</h5>
              <ul>
                  <li>
                      <label>
                      <input type = "number" required id = 'defending-standing-tackle' name ='defending-standing-tackle' max = "99" min = "0"/>
                      Standing tackle</label>
                  </li>
                  <li>
                      <label>
                      <input type = "number" required id = 'defending-sliding-tackle' name ='defending-sliding-tackle' max = "99" min = "0"/>
                      Sliding tackle</label>
                  </li>
              </ul>
          </div>
          <div className='player-ability-card'>
              <h5>Goalkeeping</h5>
              <ul>
                  <li>
                      <label>
                      <input type = "number" required id = 'goalkeeping-diving' name ='goalkeeping-diving' max = "99" min = "0"/>
                      Diving</label>
                  </li>
                  <li>
                      <label>
                      <input type = "number" required id = 'goalkeeping-handling' name ='goalkeeping-handling' max = "99" min = "0"/>
                      Handling</label>
                  </li>
                  <li>
                      <label>
                      <input type = "number" required id = 'goalkeeping-kicking' name ='goalkeeping-kicking' max = "99" min = "0"/>
                      Kicking</label>
                  </li>
                  <li>
                      <label>
                      <input type = "number" required id = 'goalkeeping-positioning' name ='goalkeeping-positioning' max = "99" min = "0"/>
                      Positioning</label>
                  </li>
                  <li>
                      <label>
                      <input type = "number" required id = 'goalkeeping-reflexes' name ='goalkeeping-reflexes' max = "99" min = "0"/>
                      Reflexes</label>
                  </li>
              </ul>
          </div>
        </div>
        <div className='player-team-form'>
        <h5>Team</h5>
        <ul>
            <li>
                <label>
                <input type = "text" required id = 'input-team' placeholder='team'/>
                </label>
            </li>
            <li>
                <label>
                <input type = "text" required id = 'start-year' placeholder='Joined year'/>
                </label>
            </li>
            <li>
                <label>
                <input type = "text" required id = 'end-year' placeholder='Year ended'/>
                </label>
            </li>

        </ul>
        </div>


        <Button variant="dark" type="submit">
          Submit
        </Button>
      </Form>
      </Container>

  );
}

export default CreatePlayer;
