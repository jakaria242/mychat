import React from 'react'
import UserList from './UserList';
import FriendsList from './FriendsList';
import FriendRequest from './FriendRequest';
import BlockList from './BlockList';
import '../home/home.css'


const Home = () => {
  return (
    <>
    <div className='home_wrapper'>
      <UserList/>
      <FriendRequest/>
      <FriendsList/>
      <BlockList/>
    </div>
    </>
  )
}

export default Home