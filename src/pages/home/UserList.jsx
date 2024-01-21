import React from 'react'
import GroupCard from '../../components/home/GroupCard'
import Ellipse from '../../assets/images/Ellipse 2.png'
import Image from '../../utilities/Image'
import { FaPlusSquare } from "react-icons/fa";

const UserList = () => {
  return (
    <>
        <GroupCard cardtitle="User List">
      <div className='user_box'>
        <div className='user_item'>
          <div className="user_img">
            <Image src={Ellipse} alt='Not Found'/>
          </div>
          <div className='user_info'>
            <div className='user_detils'>
                <h5>Jakaria</h5>
              <p>MERN Developer</p>
            </div>
            <div className='user_fd'>
            <FaPlusSquare />
            </div>
          </div>
        </div>
        <div className='user_item'>
          <div className="user_img">
            <Image src={Ellipse} alt='Not Found'/>
          </div>
          <div className='user_info'>
            <div className='user_detils'>
                <h5>Jakaria</h5>
              <p>MERN Developer</p>
            </div>
            <div className='user_fd'>
            <FaPlusSquare />
            </div>
          </div>
        </div>
        <div className='user_item'>
          <div className="user_img">
            <Image src={Ellipse} alt='Not Found'/>
          </div>
          <div className='user_info'>
            <div className='user_detils'>
                <h5>Jakaria</h5>
              <p>MERN Developer</p>
            </div>
            <div className='user_fd'>
            <FaPlusSquare />
            </div>
          </div>
        </div>
        <div className='user_item'>
          <div className="user_img">
            <Image src={Ellipse} alt='Not Found'/>
          </div>
          <div className='user_info'>
            <div className='user_detils'>
                <h5>Jakaria</h5>
              <p>MERN Developer</p>
            </div>
            <div className='user_fd'>
            <FaPlusSquare />
            </div>
          </div>
        </div>
        <div className='user_item'>
          <div className="user_img">
            <Image src={Ellipse} alt='Not Found'/>
          </div>
          <div className='user_info'>
            <div className='user_detils'>
                <h5>Jakaria</h5>
              <p>MERN Developer</p>
            </div>
            <div className='user_fd'>
            <FaPlusSquare />
            </div>
          </div>
        </div>
        <div className='user_item'>
          <div className="user_img">
            <Image src={Ellipse} alt='Not Found'/>
          </div>
          <div className='user_info'>
            <div className='user_detils'>
                <h5>Jakaria</h5>
              <p>MERN Developer</p>
            </div>
            <div className='user_fd'>
            <FaPlusSquare />
            </div>
          </div>
        </div>
      </div>
    </GroupCard>
    </>
  )
}

export default UserList