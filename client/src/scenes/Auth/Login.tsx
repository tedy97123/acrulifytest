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
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { useGetUserLoginMutation } from '@/state/api';
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { currentUser } from '@/state/redux/actions';
import { ValidatedUser } from '@/state/types';

 function Login() {
  const navigate = useNavigate();
  const [getUserLogin] = useGetUserLoginMutation();
  const dispatch = useDispatch();
  const [returnedUserData, setreturnedUserData] = useState({})
  const {palette} = useTheme();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = ({
      email: data.get('email'),
      password: data.get('password'),
    });
    const newUserData = userData
    getUserLogin(newUserData).unwrap()
      .then((response: any) => {
          console.log(response)
          setreturnedUserData(response)
          console.log(returnedUserData)
          navigate('/Dashboard') 
      })
      .catch((error: any) => {
        console.error('Wrong Credentials:', error);
      });
  };

   useEffect(() => {
      const action = {
      type: 'USER_INFO',
      payload: returnedUserData,
    };
    dispatch(action);
  }, [returnedUserData, dispatch]); 

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
                  color: palette.grey[300],
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
  dispatchCurrentUserInfo: currentUser,
};

export default connect(null, mapDispatchToProps)(Login);