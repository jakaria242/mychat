import React from 'react'
import GroupCard from '../../components/home/GroupCard'
import Image from '../../utilities/Image'
import Ellipse from '../../assets/images/Ellipse 2.png'


const FriendsList = () => {
  return (
    <GroupCard cardtitle="Friends">
    <div className='user_box'>
       {
        [0,1,2,3,4,5].map((item, index)=>(
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
                  <button>Block</button>
              </div>
            </div>
          </div>
        ))
       }
    </div>
  </GroupCard>
  )
}

export default FriendsList