import React, { useEffect } from 'react'
import '../layout/layout.css'
import { GrLogout } from "react-icons/gr";
import { NavLink } from 'react-router-dom';
import { MdOutlineHome } from "react-icons/md";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import Image from '../../utilities/Image';
import UserPic from '../../assets/images/userpic.jpg';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux'
import { loginuser } from '../../slices/userSlice';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { MdCloudUpload } from "react-icons/md";

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


const Sidebar = () => {


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const data = useSelector((state) =>state.loginuserdata.value)

  // console.log(data);
  // console.log(data.email);
  // console.log(data.displayName);
  // console.log(data.photoURL);



  const dispatch = useDispatch()

  const navigate = useNavigate();

  const auth = getAuth();


  // let location = (window.location.host);
  // console.log(location);

  useEffect(()=>{
    if(!data){
      navigate("/")
    }else{
      navigate("/home")
    }
  },[])

  // useEffect(()=>{
  //   if(data == location){
  //     navigate("/home")
  //   }
  // },[])


  // Logout --==================================================

  let handleLogOut = () =>{
    signOut(auth).then(()=>{
      localStorage.removeItem("user")
      dispatch(loginuser(null))
      toast.success('Logout Done!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
      setTimeout(()=>{
       navigate("/")
      },2000)
    })
  }

   // Logout --==================================================


  const userinfo = auth.currentUser;

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
       <div className='upload_modal'>
       <h2>Upload Profile Photo</h2>
       <div className='img_holder'>
       <Image src={data && data.photoURL} alt="Not Found"/>
       </div>
         <input type='file'/>
       </div>
        </Box>
      </Modal>
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
    <div className='sidebarBox'>
      <div>
        <div className='sidebar_imgbox'>
          <Image src={data && data.photoURL} alt="Not Found"/>
          <div className="image_overlay" onClick={handleOpen}><MdCloudUpload /></div>
        </div>
        <h3 className='username'>{data && data.displayName}</h3>

      </div>
        <div className='sidebar_manu'>
          <ul>
            <li>
              <NavLink to="/home"><MdOutlineHome /></NavLink>
            </li>
            <li>
              <NavLink to="/message"> <IoChatbubbleEllipses /> </NavLink>
            </li>
            <li>
              <NavLink to="/notification"><IoMdNotificationsOutline /></NavLink>
            </li>
            <li>
              <NavLink to="/settings"><IoSettingsOutline /></NavLink>
            </li>
          </ul>
        </div>
        <div onClick={handleLogOut} className='logout'>
        <NavLink to="#"><GrLogout /></NavLink>
        </div>
    </div>
    </>
  )
}

export default Sidebar