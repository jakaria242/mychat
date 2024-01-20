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






const Sidebar = () => {
  return (
    <>
    <div className='sidebarBox'>
      <div>
        <div className='sidebar_imgbox'>
          <Image src={UserPic} alt="Not Found"/>
        </div>
        <h3 className='username'>Jakaria</h3>
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
        <div className='logout'>
        <NavLink to="#"><GrLogout /></NavLink>
        </div>
    </div>
    </>
  )
}

export default Sidebar