
import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import "./login.css"
import SectionHeading from '../../components/SectionHeading';
import googleicon from '../../../public/images/google-icon.png'
import Loginimg from '../../assets/images/loginImg.jpg'
import { Link } from 'react-router-dom';
import Image from '../../utilities/Image';
import Input from '../../components/Input';
import CustomButton from '../../components/CustomButton';
import AuthNavigate from '../../components/AuthNavigate';
import { FaRegEye, FaRegEyeSlash,} from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import Modal from '@mui/material/Modal';
import { Alert } from '@mui/material';
import { getAuth, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux'
import { loginuser } from '../../slices/userSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Login = () => {

  const dispatch = useDispatch()

  const navigate = useNavigate();

  const auth = getAuth();
  const provider = new GoogleAuthProvider ();

  const [hideShoew, setHideShoew] = useState(false);
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let handleModalClose = () => {
    setOpen(false)
  }



  let handleGoogleAuth = () => {
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
  }
  
//  forgot validation

  let [forgetError, setForgetError] = useState({
    forgetemail:"",
  })

  let [forgetData, setForgetData] = useState({
    forgetemail:"",
  })
  let handleForget = (e) => {
    let {name,value} = e.target
    setForgetData({
      ...forgetData, [name]:value
    })
  }

  let handleSend = () => {
    if (!forgetData.forgetemail){
      setForgetError({forgetemail : "Enter your email"});
    }else if(!forgetData.forgetemail.match(emailregex)){
      setForgetError({forgetemail: "Invalid email address"});
    }else{
      setForgetError({ forgetemail: "",})
      sendPasswordResetEmail(auth, forgetData.forgetemail)
          .then(() => {
            console.log("password change done");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
          });
    }
    
  }
 //  forgot validation

   // login validation start
  let [loginError, setLoginError] = useState({
    email : "",
    password: "",
  })

  let [signInData, setSignInData] = useState({
    email : "",
    password: "",
  })

 
   let handleForm = (e)=> {
    let {name,value} = e.target
    setSignInData({
      ...signInData, [name]:value
    })
   }
  
   let emailregex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

   let passwordregex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  let handleLogin = ()=> {
    if(!signInData.email){
      setLoginError({email: "Enter your email"});
    }else if(!signInData.email.match(emailregex)){
      setLoginError({email:"Invalid email address"});
    }else if(!signInData.password){
      setLoginError({password: "Enter your password"});
    }else if(!signInData.password.match(passwordregex)){
      setLoginError({email: "Invalid email or password address"});
    }else{
      setLoginError({
        email : "",
        password: "",
      })
      
      signInWithEmailAndPassword(auth, signInData.email, signInData.password).then((userCredential)=>{
        if (userCredential.user.emailVerified) {
          localStorage.setItem("user", JSON.stringify(userCredential.user))
          dispatch(loginuser(userCredential.user))
          navigate("\home")
        }else{
          signOut(auth).then(()=>{
            toast.error('Pleace verify your email', {
              position: "top-left",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              });
          })
        }
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode == "auth/invalid-credential"){
          setLoginError({email: "Invalid email or password address"});
        }else{
          setLoginError({email: ""});
        }
        console.log(errorMessage);
      });
      // console.log(signInData);
    }
  }

   // login validation End

  return (
<>
<ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
  <Box>
      <Grid container spacing={0}>
        <Grid item xs={6}>
            <div className="loginbox">
              <div>
              <SectionHeading style='auth_heading' text="Login to your account!"/>
              <div onClick={handleGoogleAuth} className="provider_login">
                <Image src={googleicon} alt="NotFound"/>
              <Link to="#">Login with Google</Link>
              </div>
              <div className='from_main'>
                <div>
                  <Input onChange={handleForm} style='login_input_field' type='email' name='email' label='Email Addres' placeholder='Enter your email' variant='standard'/>
                  {
                   loginError.email &&
                     <Alert className='regierroe' severity="error">{loginError.email}</Alert>    
                  }
                </div>
                <div className='login_pass_shoeicon'>
                  <Input onChange={handleForm} style='login_input_field' type={hideShoew ? 'text' : 'password'} name='password' label='password' placeholder='Enter your password' variant='standard'/>
                  <div className="hide_show_login"  onClick={()=>setHideShoew(!hideShoew)}>
                  {hideShoew ? <FaRegEye /> : <FaRegEyeSlash />}
                  </div>
                  {
                   loginError.password &&
                     <Alert className='regierroe' severity="error">{ loginError.password}</Alert>    
                  }
                </div>
                  <CustomButton onClick={handleLogin} styling='loginbtn' variant="contained" text='Login to Continue'/>
              </div>
              <AuthNavigate style='loginauth' text='Don’t have an account ?'  linktext='Sign up' link='/registration'/>
              <p className='loginauth'>
              Reset your password?
                  <span onClick={handleOpen}>Click Here</span>
              </p>
              </div>
            </div>
          </Grid>
          <Grid item xs={6}>
          <div className="loginimg">
          <Image src={Loginimg} alt="Not Found"/>
          </div>
        </Grid>
      </Grid>
  </Box>
  <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="closeicon" onClick={handleModalClose}>
          <IoCloseSharp />
          </div>
            <div className="forgot_box">
              <h2>Forgotten password?</h2>
                  <Input onChange={handleForget}  type='email' name='forgetemail' label='Email Addres' placeholder='Enter your email' variant='standard'/>
                  {
                    forgetError.forgetemail && <Alert className='regierroe' severity="error">{forgetError.forgetemail}</Alert> 
                  }
              <CustomButton onClick={handleSend} variant="contained" text='Send link'/>

            </div>
        </Box>
    </Modal>

</>
  )
}

export default Login