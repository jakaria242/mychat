import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SectionHeading from '../../components/SectionHeading';
import Input from '../../components/Input';
import CustomButton from '../../components/CustomButton';
import AuthNavigate from '../../components/AuthNavigate';
import '../registration/registration.css'
import { FaRegEye, FaRegEyeSlash  } from "react-icons/fa6";
import { Alert } from '@mui/material';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile  } from "firebase/auth";
import { Circles } from 'react-loader-spinner'
import { useNavigate } from "react-router-dom";
import { getDatabase, ref, set } from "firebase/database";

const Registration = () => {

  const db = getDatabase();

  const navigate = useNavigate();

  const [loader, setLoader] = useState(false)

  const auth = getAuth();

  let [hideShoew, setHideShoew] = useState(false);
  let handleToggoleHideShoe = () => {
    setHideShoew(!hideShoew)
  }
  
  let [regisError, setRegisError] = useState({
    fullname : "",
    email : "",
    password : ""
  })

  let [signUpData, setSignUpData] = useState({
    fullname : "",
    email : "",
    password : ""
  })
 
   let handleForm = (e) =>{
     let {name, value} = e.target
     setSignUpData({
      ...signUpData, [name] : value
     })
   }

  let fullName = /^[a-z]+\s[a-z ]+$/i;

   let emailregex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

   let passwordregex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;



  let handleSubmit = () => {
    if(!signUpData.fullname){
      setRegisError({fullname:"Enter your Full name"});
    }else if(!signUpData.fullname.match(fullName)){
      setRegisError({fullname:"Use your Full name"});
    }else if(!signUpData.email){
      setRegisError({email:"Please enter your email"});
    }else if(!signUpData.email.match(emailregex)){
      setRegisError({email:"Invalid email address"});
    }else if(!signUpData.password){
      setRegisError({password:"Enter your password"});
    }else if(!signUpData.password.match(passwordregex)){
      setRegisError({password:"Use strong password"});
    }else{
      setRegisError({
        fullname : "",
        email : "",
        password : ""
      })
      
      setLoader(true)
      createUserWithEmailAndPassword(auth, signUpData.email, signUpData.password).then((userCredential)=>{
       sendEmailVerification(auth.currentUser).then(()=>{
        
        updateProfile(auth.currentUser,{
          displayName: signUpData.fullname,
          photoURL: "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png"
        }).then(()=>{
          set(ref(db, 'users/' + userCredential.user.uid), {
            username:  userCredential.user.displayName,
            email:  userCredential.user.email,
            profile_picture :  userCredential.user.photoURL
          }).then(()=>{
            navigate("/");
            console.log(userCredential)
          })
        })
      })
       setSignUpData({
        fullname : "",
        email : "",
        password : ""
       })
      }).catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;
        if (errorCode == "auth/email-already-in-use") {
          setRegisError({email:"Email already Use"});
        }else{
          setRegisError({email:""});
        }
      });
      setLoader(false)
      // console.log(signUpData);
    }
  }

  return (
    <>

    <Box>
    <Grid container spacing={0}>
      <Grid item xs={12}>
          <div className="loginbox">
            <div>
            <SectionHeading style='auth_heading' text="Get started with easily register"/>
            <p className='regigtapera'>Free register and you can enjoy it</p>
            <div className='from_mainn'>
            <div>
                <Input onChange={handleForm} style='registration_input_field' value={signUpData.fullname} type='text' name='fullname' label='Full name' variant='outlined'/>
                  {
                    regisError.fullname &&
                     <Alert className='regierroe' severity="error">{regisError.fullname}</Alert>    
                  }
              </div>
              <div>
                <Input onChange={handleForm} style='registration_input_field'  value={signUpData.email} type='email' name='email' label='Email Address'  variant='outlined'/>
                {
                    regisError.email &&
                     <Alert className='regierroe' severity="error">{regisError.email}</Alert>
                  }
              </div>
              <div className='regis_pass_shoeicon'>
                <Input onChange={handleForm} style='registration_input_field'  value={signUpData.password} type={hideShoew ? 'text' : 'password'} name='password' label='Password' variant='outlined'/>
                <div className="hide_show_registration"  onClick={handleToggoleHideShoe}>
                {hideShoew ? <FaRegEye /> : <FaRegEyeSlash />}
                  </div>
                  {
                    regisError.password &&
                     <Alert className='regierroe' severity="error">{regisError.password}</Alert>
                  }
              </div>
              {
                loader ? <Circles
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                />
                 :
                 <CustomButton onClick={handleSubmit} styling='registrationbtn' variant="contained" text='Sign up'/>
              }
            </div>
            <AuthNavigate style='loginauth' text='Already  have an account ?'  linktext='Sign In' link='/'/>
            </div>
          </div>
        </Grid>

    </Grid>
</Box>
    </>
  )
}

export default Registration
