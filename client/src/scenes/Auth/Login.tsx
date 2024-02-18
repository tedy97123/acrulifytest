import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import {useGetUserLoginMutation } from '@/state/api';
import { connect, useDispatch } from 'react-redux';
import {loggedInUser } from '@/state/redux/actions';
import { useState } from 'react';
import FlexBetween from '@/components/FlexBetween';

 function Login() {
  const navigate = useNavigate();
  const [getUserLogin] = useGetUserLoginMutation();
  const dispatch = useDispatch();
    const [error,setError] = useState()

 const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
 
  const userData = {
    email: data.get('email'),
    password: data.get('password'),
  }; 
  
  getUserLogin(userData).unwrap()
    .then((response: any) => {
      // Check if the response is not empty
      if (Object.keys(response).length !== 0) {
        const action = {
          type: 'USER_INFO',
          payload: response,
        };
        dispatch(action);

        navigate('/Dashboard' );
      }})
    .catch((error: any) => {
      console.error('Wrong Credentials:', error); 
    });
};
 

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h1">
            Sign in
          </Typography>
          <FlexBetween>
            <Typography>
            {error}
            </Typography>
          </FlexBetween>
          <Box 
          component="form" 
          onSubmit={handleSubmit} 
          noValidate sx={{ mt: 1 }} 
          >
            <TextField 
              sx={{bgcolor:"white"}}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              variant='outlined'
            />
            <TextField
              sx={{bgcolor:"white"}}
              margin="dense"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              sx={{
                ".MuiFormControlLabel-label": 
                {
                  color: 'white',
                  border: "none",
                },
                marginTop:"1rem"}}
              control={<Checkbox sx={{color:"white"}} value="remember" color="primary" />}
              label="Remember me"
              
            />
            <Button 
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {}}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/Signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}

const mapDispatchToProps =  {
  dispatchCurrentUserInfo: loggedInUser, 
};

export default connect(null, mapDispatchToProps)(Login);