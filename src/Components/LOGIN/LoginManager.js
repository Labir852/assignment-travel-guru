import * as firebase from "firebase/app";
import firebaseConfig from '../../firebase.config';
import "firebase/auth";


export const initializeLoginFramework = () =>{
    if(firebase.apps.length ===0)
    {
        firebase.initializeApp(firebaseConfig);
    }
    
}
export const handleGoogleSignin = ()=>{
    const Googleprovider = new firebase.auth.GoogleAuthProvider();
     return firebase.auth().signInWithPopup(Googleprovider)
    .then(res => {
      const {displayName,photoURL,email} = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email:email,
        photo:photoURL,
        Success:true
          }
      return signedInUser;
    })
    .catch(err => {
      const signedInUser = {};
      signedInUser.message = err.message;
      console.log(signedInUser);
    })
    
  }

  export const handlefbSignIn = ()=> {
    const fbprovider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbprovider)
    .then(function(result) {
      //var token = result.credential.accessToken;
      var user = result.user;
      user.Success = true;
      return user;
    })
    .catch(function(err) {
      const signedInUser = {};
      signedInUser.message = err.message;
    });
    
  }

  export const createUserWithEmailAndPassword = (name,email,password) =>{
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res => {
      const newUserInfo =res.user;
      newUserInfo.error = "";
      newUserInfo.Success = true;
      updateUserName(name);
      return newUserInfo;
    })
    .catch(error=>

     {
      // Handle Errors here.
      const newUserInfo={};
      newUserInfo.error = error.message;
      newUserInfo.Success = false;
      return newUserInfo;
      // ...
    });
  }

  export const signInWithEmailAndPassword = (email,password) =>{
    return firebase.auth().signInWithEmailAndPassword(email,password)
    .then(res => {
      const newUserInfo =res.user;
      newUserInfo.error = "";
      newUserInfo.Success = true;
      return newUserInfo;
    })
    .catch(function(error) {
      // Handle Errors here.
      const newUserInfo={};
      newUserInfo.error = error.message;
      newUserInfo.Success = false;
      return newUserInfo; 
      // ...
    });
  }




  export const updateUserName = name =>{
    const user = firebase.auth().currentUser;
  
    user.updateProfile({
      displayName: name
    }).then().catch(function(err) {
      console.log(err);
    });
  }

