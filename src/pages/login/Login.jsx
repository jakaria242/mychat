
import React from 'react'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import "./login.css"
import SectionHeading from '../../components/SectionHeading';
import googleicon from '../../../public/images/google-icon.png'
import loginimg from '../../assets/images/login-img.jpg'
import Img from '../../components/Img';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';




const LoginbtnButton = styled(Button)({
  fontSize: 20,
  padding: '26px 118px',
  border: '1px solid',
  backgroundColor: '#5F34F5',
  borderColor: '#5F34F5',
  fontWeight: "400",
  fontFamily: [
    'Open Sans', 
  ].join(','),
  '&:hover': {
    backgroundColor: '#5F34F5',
    borderColor: '#5F34F5',
  },
  '&:active': {
    backgroundColor: '#5F34F5',
    borderColor: '#5F34F5',
  },
});

const Login = () => {
  
  return (
    <>
              <Box>
            <Grid container spacing={0}>
              <Grid item xs={6}>
                <div className='loginbox'>
                  <div>
                    <SectionHeading style="auth_heading" text="Login to your account!"/>
                    <div className='provider_login'>
                        <Img sorce={googleicon} alt="not found"/>
                        <span><Link to="#">Login with Google</Link></span>
                    </div>
                    <div className='form_main'>
                      <TextField fullWidth id="outlined-basic" placeholder='Youraddres@email.com' label="Email Address" variant="standard" />
                      <TextField fullWidth id="outlined-basic" type='password' placeholder='Enter your password' label="Password" variant="standard" />
                    </div>
                    <div className="loginbtn">
                      <LoginbtnButton variant="contained" disableRipple>Login to Continue</LoginbtnButton>
                    </div>
                    <div className="notaccount">
                    <h5>Don’t have an account ?</h5><Link>Sign up</Link>
                    </div>

                  </div>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className='loginimg'>
                  <Img sorce={loginimg} alt="Not Found"/>
                </div>
              </Grid>
            </Grid>
        </Box>
    </>
  )
}

export default Login