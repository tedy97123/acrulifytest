import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useTheme } from '@emotion/react';
import { usePostCreateNewUserMutation } from '@/state/api';
import {GetUserResponse} from '../../state/types';
import { useNavigate, useRoutes } from 'react-router-dom';
export  default function Signup() {
 
  const {palette} = useTheme();
  const [postCreateNewUser] = usePostCreateNewUserMutation();
   let navigate = useNavigate() 

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = ({
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      totalTimeWorked: 0 ,
      email: data.get('email'),
      password: data.get('password'),
    });
    const newUserData = JSON.stringify(userData)
    postCreateNewUser(newUserData).unwrap()
      .then((response: any) => {
        console.log('User created:', response);
        if(response != null || undefined){
          navigate('/Login')
        }
      })
      .catch((error: any) => {
        console.error('Error creating user:', error);
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
            Sign Up
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
              id="firstName"
              label="First Name"
              name="firstName"
              autoComplete="firstName"
              autoFocus
              variant='outlined'
            />
            <TextField
              sx={{bgcolor:"white"}}
              margin="dense"
              required
              fullWidth
              name="lastName"
              label="lastName"
              type="lastName"
              id="lastName"
              autoComplete="current-password"
            />
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

            />
            <Button 
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign up
            </Button>
          </Box>
        </Box>
      </Container>
  );
}