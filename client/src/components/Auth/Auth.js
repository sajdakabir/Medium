import React, { useState } from 'react';
import { Avatar, Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import useStyle from './style';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useDispatch } from 'react-redux';
import { AUTH, LOGOUT } from '../../constants/actionTypes'
import Input from './Input';
import{signup,signin} from '../../actions/auth';

const initialState={ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

function Auth() {
    const classes = useStyle();
    const dispatch = useDispatch();
    const history = useHistory();
    const [formData,setFormData]=useState(initialState);
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignUp] = useState(false);

    const handleShowPassword = () => setShowPassword(!showPassword);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const switchMode = () => {
        setFormData(initialState);
        setIsSignUp((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(isSignup){
            dispatch(signup(formData,history))
        }else{
            dispatch(signin(formData,history));
        }
    };

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res.tokenId;

        try {
            dispatch({ type: AUTH, data: { result, token } });

            history.push('/');
        } catch (error) {
            console.log(error);
        }
    };

    const googleError = (error) => {
        console.log(error);
        alert('Google Sign In was unsuccessful. Try again later');
    }

 
    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>

                    {/* <GoogleLogin
                        onSuccess={googleSuccess}
                        googleError={googleError}
                        
                    /> */}
                   
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>

            </Paper>
        </Container>
    )
}

export default Auth;
