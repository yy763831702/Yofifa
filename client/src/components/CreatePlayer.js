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

    let commonName = document.getElementById("commonName").value;
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let age = document.getElementById("age").value;
    let potential = document.getElementById("potential").value;
    let rating = document.getElementById("rating").value;
    let datePosted = Date.now();
    let newPost = {

      author: currentUser && currentUser.uid,
      commonName: commonName,
      firstName: firstName,
      lastName: lastName,
      potential: potential,
      rating: rating

    };

    const { data } = await API.post("/posts", newPost);
    // let postId = data._id;
    if (image !== "empty") {
      console.log("IMAGE DETECTED");
      const { imageResult } = await API.post("/images/" + data._id, image, {
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
        return <Redirect to={"/post/" + postData._id} />;
      }
    else alert("Could not add post, please try again");
  }
  return (
      <Container>

      <Form onSubmit={formSubmit}>
      <div>
        <img alt="" src="imgs/notfound_0_120.webp"></img>
        <label>
        <input type="file" formEncType="multipart/form-data" id="post-image" name="post-image" onChange={handleImageUpload} accept="image/jpeg, image/jpg, image/png"/>
        </label>
        <div>
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
        <input type="number" id="age" name="age" placeholder="Age"/>
        </label>
        </div>
      </div>


      <div>
          <label>Rating
          <input type="number" id='potential' name="potential" max="99" min="0"/>
          </label>
          <label>Potential
          <input type="number" id='rating' name="rating" max="99" min="0"/>
          </label>
      </div>


        <Button variant="dark" type="submit">
          Submit
        </Button>
      </Form>
      </Container>

  );
}

export default CreatePlayer;
