import React, { useState, useEffect,useContext } from 'react';
import SocialSignIn from './SocialSignIn';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../firebase/Auth';
import axios from 'axios';
import {
  doSignInWithEmailAndPassword,
  doPasswordReset
} from '../firebase/FirebaseFunctions';

function SignIn() {
  const { currentUser } = useContext(AuthContext);
  
  
  // useEffect(()=>{
  //   console.log('on load useeffect');
  //   async function fetchData(){
  //     console.log('function running')
  //     if(currentUser){
  //       try{
  //         const user = await axios.get(`http://localhost:3008/users/${currentUser.uid}`)
  //         console.log(user)
  //        }catch(e){
  //         if(e.response.status === 404){
  //         const userId = parseInt(currentUser.uid)
  //         await axios.post('http://localhost:3008/users', userId)
  //         console.log('add to moongo')
  //         }
  //       }
  //     }else{
  //       console.log('nouser')
  //     }
  //   } 
  //   fetchData() 
  // },[])

  const handleLogin = async (event) => {
    event.preventDefault();
    let { email, password } = event.target.elements;

    try {
      await doSignInWithEmailAndPassword(email.value, password.value);
      
    } catch (error) {
      alert(error);
    }
  };

  const passwordReset = (event) => {
    event.preventDefault();
    let email = document.getElementById('email').value;
    if (email) {
      doPasswordReset(email);
      alert('Password reset email was sent');
    } else {
      alert(
        'Please enter an email address below before you click the forgot password link'
      );
    }
  };
  if (currentUser) {
    async function fetchData(){
      console.log('function running')
      try{
        const user = await axios.get(`http://localhost:3008/users/${currentUser.uid}`)          
        console.log(user)
       }catch(e){
        if(e.response.status === 404){
          console.log('add to moongo')
        const newUser = {
          uid: currentUser.uid
        }
        console.log(newUser)
        await axios.post('http://localhost:3008/users', newUser)
        
        }
      }
    } 
    fetchData()
    return <Redirect to="/home" />;
  }
  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>
            Email:
            <input
              className="form-control"
              name="email"
              id="email"
              type="email"
              placeholder="Email"
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Password:
            <input
              className="form-control"
              name="password"
              type="password"
              placeholder="Password"
              required
            />
          </label>
        </div>
        <button type="submit">Log in</button>

        <button className="forgotPassword" onClick={passwordReset}>
          Forgot Password
        </button>
      </form>

      <br />
      <SocialSignIn />
    </div>
  );
}

export default SignIn;
