import React, { useContext, useState } from 'react';
import {UserContext} from '../../App';
import TextField from '@material-ui/core/TextField';
import { Container, Form } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import * as firebase from "firebase/app";
import "firebase/auth";
import Fb from '../../travel-guru-master/Icon/fb.png';
import Google from '../../travel-guru-master/Icon/google.png';
import './Login.css';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword, handlefbSignIn, handleGoogleSignin, initializeLoginFramework, signInWithEmailAndPassword, updateUserName } from './LoginManager';



function Login () {
  initializeLoginFramework();
  const [loggedInUser,setLoggedInUser] =  useContext(UserContext);
  const [newUser, setNewUser] = useState(true);
  const [user,setUser]= useState({
    isSignedIn: false,
    name:"",
    email:"",
    photo:"",
    password:"",
    error:"",
    Success: false
  });
  const history = useHistory();
  const location = useLocation();
  const {from} = location.state || {from:{pathname:"/"}};
  const handleResponse =(res,redirect)=>{
    setUser(res);
    setLoggedInUser(res,user);
    if(redirect)
    {
      history.replace(from);
    }
  }

  const handleSubmit = (e)=>{
    console.log(user);
    if(newUser && user.email && user.password)
    {
      firebase.auth().createUserWithEmailAndPassword(user.name,user.email, user.password)
      .then(res => {
       const {displayName, email} = res.user;
                       const newUserInfo = {
                           isSignedIn: true,
                           name: displayName,
                           email: email,
                           message: 'Logged in Successfully',
                           success : true
                       }
                      handleResponse(newUserInfo,true);
      })
      .catch(error=>
   
       {
        // Handle Errors here.
        const newUserInfo ={};
        newUserInfo.error = error.message;
        newUserInfo.Success = false;
        // ...
        setLoggedInUser(newUserInfo);
      });
      
} 

if(!newUser && user.email && user.password){
  e.preventDefault();
  firebase.auth().signInWithEmailAndPassword(user.email,user.password)
  .then(res => {
    const {displayName, email} = res.user;
                    const newUserInfo = {
                        isSignedIn: true,
                        name: displayName,
                        email: email,
                        message: 'Logged in Successfully',
                        success : true
                    }
                    updateUserName(displayName);
                    handleResponse(newUserInfo,true);
  })
  .catch(function(error) {
    // Handle Errors here.
    const newUserInfo ={};
     newUserInfo.error = error.message;
     newUserInfo.success = false;
     setLoggedInUser(newUserInfo);
    //return newUserInfo;
    // ...
  });
  }
  
}


  const handleBlur = (e) =>{
    let isFormValid =true;
    const signedInUser = {...loggedInUser};
   signedInUser[e.target.name] = e.target.value;
   if(e.target.name === 'confirm')
   {
    if(e.target.value !== loggedInUser.password){
     signedInUser.message = 'Password did not match';
   }
   else{
     signedInUser.message='';
   }
  }
  if(e.target.name === 'email'){
    isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
  }
  if(e.target.name === 'password'){
    const isPasswordValid = e.target.value.length > 6;
    const passwordHasNumber = /\d{1}/.test(e.target.value);
    isFormValid = isPasswordValid && passwordHasNumber;
  }
  if(isFormValid){
    const newUserInfo = {...user};
    newUserInfo[e.target.name] = e.target.value;
    setUser(newUserInfo);
}
setLoggedInUser(signedInUser);
  
}

const forgotPassword = () => {
  firebase.auth().sendPasswordResetEmail(user.email)
 .then(() => {
     const signedInUser = {...loggedInUser};
     signedInUser.message = 'Password reset link has been sent to your email';
     setLoggedInUser(signedInUser);
 })
 .catch(() => {
     const signedInUser = {...loggedInUser};
     signedInUser.message = 'Email address is empty... Please give a valid one...';
     setLoggedInUser(signedInUser);
 });
 
}


const googleSignIn = () =>{
  handleGoogleSignin()
  .then(res=>{
      handleResponse(res,true);
  })
}
const fbSignIn = ()=>{
  handlefbSignIn()
  .then(res=>{
    handleResponse(res,true);
  })
}
    return (

<Container className="text-center text-white">
    <Form onSubmit={handleSubmit}>
        <h3 className="my-4">{newUser ? 'Create Account' : 'User Login'}</h3>
        {
            newUser && <TextField onBlur={handleBlur} name="name" type="text" placeholder="Your Name" required />
        }
<br/>
        <TextField onBlur={handleBlur} name="email" type="email" placeholder="Your Email"  required />
          <br/>
        <TextField onBlur={handleBlur} name="password" type="password" placeholder="Your Password"  required />
<br/>
        {
            newUser && <TextField onBlur={handleBlur}  type="password" name="confirm" placeholder="Confirm Password"  required />
        }
<br/>
<br/>
<Button type="submit" onClick={handleSubmit} style={{ backgroundColor: '#F9A51A'}} >
{newUser ? 'Sign Up' : 'Sign In'}</Button>
     <br/>

        {
            !newUser && <span onClick={forgotPassword} className="btn text-warning"> <strong>Forgot Password </strong> </span>
        }

        <span className="btn btn-primary my-4 text-light btn-block w-50 mx-auto" onClick={()=>{
            setNewUser(!newUser);
            setLoggedInUser({
                isSignedIn: false,
                name: loggedInUser.name,
                email: loggedInUser.email,
                password: loggedInUser.password,
                message: ''
            });
        }}>
            {
                newUser ?
                'I already have an account' :
                'I am new here'
            }
        </span>

        <h6 className="text-danger text-center mt-4">{loggedInUser.message}</h6>
    </Form>
        <hr className="bg-white" />
        
        <Button onClick={fbSignIn} style={{ backgroundColor: '#FFFFFF',marginTop:"10px",borderRadius: "30px 30px 30px 30px"}}>
           <img src={Fb} style={{height:"40px",width:"40px", marginRight:"10px"}} alt=""/>
         Sign in with facebook
       </Button>
       <br/>
     <Link to="/Search"></Link> <Button onClick={googleSignIn} style={{ backgroundColor: '#FFFFFF',marginTop:"10px",borderRadius: "30px 30px 30px 30px"}}>
           <img src={Google} style={{height:"40px",width:"40px", marginRight:"10px"}} alt=""/>
         Sign in with Google
       </Button>
 <br/>
</Container>


    );
};

export default Login;