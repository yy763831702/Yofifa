import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../firebase/Auth";
import { Container, Row, Col } from "react-bootstrap";
import "../App.css";
import API from "../API";

const MyPost = () => {
  const [postData, setPostData] = useState(undefined);
  const { currentUser } = useContext(AuthContext);

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
  }, [currentUser.uid]);

  return (
    <Container>
      <Row>
        <Col>
          <div className="post-index">
          <table className='table'>
              <thead>
                  <tr>
                      <th></th>
                      <th>Name</th>
                      <th>Age</th>
                      <th>Ova</th>
                      <th>team & contract</th>
                      <th>value</th>
                      <th>wage</th>
                  </tr>
              </thead>
              <tbody>
            {postData &&
              postData.map((post) => (
                <tr key={post._id}>
                    <td className='table-td-img'>  <img alt="" src={`http://localhost:3008/img/${post._id}`}/></td>
                    <td className='table-td-info'>
                        <Link to={`/posts/${post._id}`} >
                            <div className='table-td-info-div'>
                                <span>{post.commonName}</span>
                            </div>
                            <div><span className={`pos ${post.position}`} key={post.position}>{post.position}</span></div>
                        </Link>
                    </td>
                    <td>{post.age}</td>
                    <td><span className={`p-${post.rating}`}>{post.rating}</span></td>
                    <td className='table-td-info table-player-teaminfo'>
                        <div className='table-td-info-div'>
                            <span>{post.nationality}</span>
                        </div>
                        <div className='table-td-info-contract'>{post.end_year}</div>
                    </td>
                    <td>{post.value}</td>
                    <td>{post.wage}</td>
                </tr>
              ))}
              </tbody>
              </table>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MyPost;
