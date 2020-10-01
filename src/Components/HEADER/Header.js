import React, { useContext  } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import logo from '../../travel-guru-master/Logo.png';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {Link} from "react-router-dom";

import './Header.css';
import { UserContext } from '../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { signOut } from '../LOGIN/LoginManager';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  logo :{
      maxWidth: 160,
      maxHeight:50
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  }
}));

const Header = () => {
    const classes = useStyles();
    const [loggedInUser,setLoggedInUser] = useContext(UserContext);

    
    return (
      <div className= "container">
      <AppBar  position="static"  style={{ background: 'transparent', boxShadow: 'none'}}>
        <Toolbar>
             <Link to="/"><img  edge="start" className={classes.logo} src={logo} alt=""/></Link>  
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className="Button-Group ml-auto">
          <ButtonGroup color="#FFFFFF" aria-label="outlined primary button group">
          
          <Button ><b>News</b></Button>
          <Button ><b>Destination</b></Button>
          <Button ><b>Blog</b></Button>
          <Button><b>Contact</b></Button>

          {
                            loggedInUser.isSignedIn ?
                            <Button onClick={() => signOut} variant="warning" className="mx-2">Logout <br/> {loggedInUser.name}</Button> :
                            <Link to="/login"><Button  style={{ backgroundColor: '#F9A51A'}} color="primary"><b>Login</b></Button></Link>
                        }

          
          </ButtonGroup>
          </div>
        </Toolbar>
      </AppBar>
      </div>
    );
};

export default Header;