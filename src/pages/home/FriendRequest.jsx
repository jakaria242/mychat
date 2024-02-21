import React, { useEffect, useState } from 'react'
import GroupCard from '../../components/home/GroupCard'
import Image from '../../utilities/Image'
import Ellipse from '../../assets/images/Ellipse 2.png'
import { FaPlusSquare } from "react-icons/fa";
import { getDatabase, ref, onValue , set, push, remove } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux'
import { Circles } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';

const FriendRequest = () => {

  let [frequest, setFrequest] = useState()


  const data = useSelector((state) =>state.loginuserdata.value)

  const db = getDatabase();

  useEffect(()=>{
    const fRequestRef = ref(db, 'friendrequest');
    onValue(fRequestRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item)=>{
        if(data.uid == item.val().receiverid){
          arr.push({...item.val(), id:item.key})
        }
    })
    setFrequest(arr);
  });
  },[])

// fb request cencle===============
let handleCancleFrequest= (cancleinfo)=> {
  // console.log(cancleinfo);
  remove(ref(db, 'friendrequest/' + cancleinfo.id)).then(()=>{
    toast("Request Cancle...")
  })
}
// fb request cencle===============


// fb request Accept===============
let handleAcceptFrequest = (acceptinfo) =>{
  // console.log(acceptinfo);
  set(push(ref(db, 'friends')), {
    whosendname : acceptinfo.sendername,
    whosendid : acceptinfo.senderuid,
    whosendemail : acceptinfo.sendermail,
    whosendphoto : acceptinfo.senderimg,
    whoreceivename : data.displayName,
    whoreceiveid : data.uid,
    whoreceiveemail : data.email,
    whoreceivephoto : data.photoURL,
  }).then(()=>{
    remove(ref(db, 'friendrequest/' + acceptinfo.id))
    toast(" Request Accepted Successfull ...")
  })
}
// fb request Accept===============



  return (
    <>
    <ToastContainer/>
        <GroupCard cardtitle="Friend  Request">
      <div className='user_box'>
            { frequest && frequest.length > 0 ? 
                frequest.map((item,index)=>(
                    <div key={index} className='user_item'>
                    <div className="user_img">
                      <Image src={item.senderimg} alt='Not Found'/>
                    </div>
                    <div className='user_info'>
                      <div className='user_detils'>
                          <h5>{item.sendername}</h5>
                        <p>MERN Developer</p>
                      </div>
                      <div className='user_Accept'>
                          <button onClick={()=>handleAcceptFrequest(item)}>Accept</button>
                          <button onClick={()=>handleCancleFrequest(item)}>cancle</button>
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
    </GroupCard>
    </>
  )
}

export default FriendRequest