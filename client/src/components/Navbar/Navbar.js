import React,{useState,useEffect} from 'react';
import { AppBar, Avatar, Toolbar, Typography ,Button} from '@material-ui/core';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import medium from '../../images/medium.png';

function Navbar() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const classes = useStyles();


  useEffect(() => {
    const token = user?.token;


    setUser(JSON.parse(localStorage.getItem('profile')));
  }, []);
    

    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant='h2' align='center'>Medium</Typography>
                <img className={classes.image} src={medium} alt="medium" height="60" />
            </div>

        <Toolbar>
            { user?(
                <div className={classes.profile}>
                    <Avatar className={classes.purple}alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                    <Typography className={classes.userName} variant="h6">
                        {user.result.name}
                    </Typography>
                    <Button variant="contained" className={classes.logout} color="secondary" >Logout</Button>
                </div>
            ):(
                <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
            )

            }
        </Toolbar>


        </AppBar>
    );
};

export default Navbar;
