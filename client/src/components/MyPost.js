import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../firebase/Auth";
import { Container, Row, Col, Tabs, Tab, Button } from "react-bootstrap";
import "../App.css";
import API from "../API";

const MyPost = (props) => {
  const [postData, setPostData] = useState(undefined);
  const { currentUser } = useContext(AuthContext);
  const [key, setKey] = useState(undefined);
  let li = null;


  useEffect(() => {
    async function fetchData() {
        try {
          const { data } = await API.get("/posts/users/" + currentUser.uid);
          data.reverse();
          setPostData(data);
        } catch (e) {
          console.log(e);
        }
    }
    fetchData();
  }, []);

  const buildListItem = (post) => {
    return (
      <li key={post._id}>
        <Link to={`/posts/${post._id}`}>{post.commonName}</Link>
      </li>
    );
  };

  const imagePath = "http://localhost:5000/img/";
  const handleSelect = (newKey) => {
    setKey(newKey);
  };

  return (
    <Container>
      <Row>
        <Col>
          <div className="post-index">
            {postData &&
              postData.map((post) => (
                // <img alt="" src={imagePath}></img>
                  <Link to={`/posts/${post._id}`}>{post.commonName}
                  </Link>
              ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MyPost;
