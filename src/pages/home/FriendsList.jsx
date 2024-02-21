import React, { useEffect, useState } from 'react'
import GroupCard from '../../components/home/GroupCard'
import Image from '../../utilities/Image'
import Ellipse from '../../assets/images/Ellipse 2.png'
import { getDatabase, ref, onValue , set, push } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux'
import { Circles } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';


const FriendsList = () => {
  const [friendList, setfriendList] = useState([])


  const data = useSelector((state) =>state.loginuserdata.value)

  const db = getDatabase();

  useEffect(()=>{
    const friendRef = ref(db, 'friends');
    onValue(friendRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item)=>{
        if(data.uid == item.val().whoreceiveid || data.uid !== item.val().whosendid){
          arr.push({...item.val(), id:item.key})
        }
    })
    setfriendList(arr);
  });
  },[])




  return (
    
 <>
 <ToastContainer/>
    <GroupCard cardtitle="Friends">
    <div className='user_box'>
       {friendList && friendList.length>0

       ?
         friendList.map((item, index)=>(
            <div key={index} className='user_item'>
            <div className="user_img">
              <Image src={item.whosendphoto} alt='Not Found'/>
            </div>
            <div className='user_info'>
              <div className='user_detils'>
                  <h5>{item.whosendname}</h5>
                <p>MERN Developer</p>
              </div>
              <div className='user_Accept'>
                  <button>Block</button>
              </div>
            </div>
          </div>
        ))
        :
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
  </GroupCard></>
  )
}

export default FriendsList