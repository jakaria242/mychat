import React from 'react'
import GroupCard from '../../components/home/GroupCard'
import Image from '../../utilities/Image'
import Ellipse from '../../assets/images/Ellipse 2.png'
import { FaPlusSquare } from "react-icons/fa";

const FriendRequest = () => {
  return (
    <>
        <GroupCard cardtitle="Friend  Request">
      <div className='user_box'>
            {
                [0,1,2,3,4,5].map((item,index)=>(
                    <div key={index} className='user_item'>
                    <div className="user_img">
                      <Image src={Ellipse} alt='Not Found'/>
                    </div>
                    <div className='user_info'>
                      <div className='user_detils'>
                          <h5>Jakaria</h5>
                        <p>MERN Developer</p>
                      </div>
                      <div className='user_Accept'>
                          <button>Accept</button>
                      </div>
                    </div>
                  </div>
                ))
            }
      </div>
    </GroupCard>
    </>
  )
}

export default FriendRequest