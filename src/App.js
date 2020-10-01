import React, { createContext, useState } from 'react';
import './App.css';
import Header from './Components/HEADER/Header';
import Home from './Components/HOME/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './Components/LOGIN/Login';
import Booking from './Components/BOOKING/Booking';
import PrivateRoute from './Components/LOGIN/PrivateRoute';
import Search from './Components/SEARCH/Search';
export const UserContext = createContext();
function App() {
  const [loggedInUser,setLoggedInUser] = useState({});
  console.log(loggedInUser.isSignedIn);
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]} >
      <div className="App">
     <Router>
     <Header></Header>
      <Switch>
        <Route path="/home">
          <Home></Home>
        </Route>
        <Route path="/booking/:placeName">
          <Booking></Booking>
        </Route>
      
        <Route path="/login">
          <Login></Login>
        </Route>

        <PrivateRoute path="/Search/:placeName">
              <Search></Search>
            </PrivateRoute>

        <Route exact path="/">
          <Home></Home>
        </Route>

        <Route path="/*">
          <h2 alignItems="center">404 Error!</h2>
          <h4>Page not Found</h4>
        </Route>
        </Switch>
     </Router>
     </div>
    </UserContext.Provider>
    
  );
}

export default App;
