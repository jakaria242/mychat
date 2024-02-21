import React, { useEffect, useState } from 'react'
import GroupCard from '../../components/home/GroupCard'
import Ellipse from '../../assets/images/Ellipse 2.png'
import Image from '../../utilities/Image'
import { FaPlusSquare } from "react-icons/fa";
import { getDatabase, ref, onValue , set, push } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux'
import { Circles } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';


const UserList = () => {

  const [usersList, setUsersList] = useState([])

  const data = useSelector((state) =>state.loginuserdata.value)


  const db = getDatabase();

  useEffect(()=>{
    const usersRef = ref(db, 'users');
    onValue(usersRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item)=>{
        if(data.uid != item.key){
          arr.push({...item.val(), id:item.key})
        }
    })
    setUsersList(arr);
  });
  },[])


  let handleFrequest = (frequestinfo)=>{
    // console.log(frequestinfo);
    set(push(ref(db, 'friendrequest')), {
      senderuid : data.uid,
      sendername : data.displayName,
      senderimg : data.photoURL,
      sendermail : data.email,
      receiverid : frequestinfo.id,
      receivername : frequestinfo.username,
      receiverimg : frequestinfo.profile_picture,
      receiveriemail : frequestinfo.email
    }).then(()=>{
      toast("Friend Request Send Successfull ...")
    })
  }
  


  return (
    <>
    <ToastContainer/>
        <GroupCard cardtitle="User List">
      <div className='user_box'>
        { usersList && usersList.length>0
         ?
        usersList.map((item,index)=>(
          <div key={index} className='user_item'>
          <div className="user_img">
            <Image src={item.profile_picture} alt='Not Found'/>
          </div>
          <div className='user_info'>
            <div className='user_detils'>
                <h5>{item.username}</h5>
              <p>MERN Developer</p>
            </div>
            <div onClick={()=>handleFrequest(item)} className='user_fd'>
            <FaPlusSquare />
            </div>
          </div>
        </div>
        ))
        :
        // <h3>No User Found .......</h3>
            <Circles
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                />
        }

      </div>
    </GroupCard>
    </>
  )
}

export default UserList