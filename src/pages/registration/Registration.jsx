import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SectionHeading from '../../components/SectionHeading';
import Input from '../../components/Input';
import CustomButton from '../../components/CustomButton';
import AuthNavigate from '../../components/AuthNavigate';
import Image from '../../utilities/Image';
import '../registration/registration.css'
import regitrationImg from '../../assets/images/registrationImg.jpg'
import { FaRegEye, FaRegEyeSlash  } from "react-icons/fa6";

const Registration = () => {
  let [hideShoew, setHideShoew] = useState(false);
  let handleToggoleHideShoe = () => {
    setHideShoew(!hideShoew)
  }

  return (
    <Box>
    <Grid container spacing={0}>
      <Grid item xs={6}>
          <div className="loginbox">
            <div>
            <SectionHeading style='auth_heading' text="Get started with easily register"/>
            <p className='regigtapera'>Free register and you can enjoy it</p>
            <div className='from_mainn'>
            <div>
                <Input style='registration_input_field' type='text' name='full name' label='Full name' variant='outlined'/>
              </div>
              <div>
                <Input style='registration_input_field' type='email' name='email' label='Email Address'  variant='outlined'/>
              </div>
              <div>
                <Input style='registration_input_field'type={hideShoew ? 'text' : 'password'} name='password' label='Password' variant='outlined'/>
                <div className="hide_show_registration"  onClick={handleToggoleHideShoe}>
                {hideShoew ? <FaRegEye /> : <FaRegEyeSlash />}
                  </div>
              </div>
                <CustomButton styling='registrationbtn' variant="contained" text='Sign up'/>
            </div>
            <AuthNavigate style='loginauth' text='Already  have an account ?'  linktext='Sign In' link='/'/>
            </div>
          </div>
        </Grid>
        <Grid item xs={6}>
        <div className="loginimg">
        <Image src={regitrationImg} alt="Not Found"/>
        </div>
      </Grid>
    </Grid>
</Box>
  )
}

export default Registration
