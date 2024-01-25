import React from 'react'
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




const Sidebar = () => {

  const navigate = useNavigate();

  const auth = getAuth();

  let handleLogOut = () =>{
    signOut(auth).then(()=>{
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
  const userinfo = auth.currentUser;

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
    <div className='sidebarBox'>
      <div>
        <div className='sidebar_imgbox'>
          <Image src={userinfo && userinfo.photoURL} alt="Not Found"/>
        </div>
        <h3 className='username'>{userinfo && userinfo.displayName}</h3>
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