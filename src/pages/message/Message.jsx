import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue , set, push, remove } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux';
import "./massage.css"
import Image from '../../utilities/Image';

const Message = () => {

  const [friendList, setfriendList] = useState([])

  const data = useSelector((state) =>state.loginuserdata.value)

  const db = getDatabase();


  useEffect(()=>{
    const friendRef = ref(db, 'friends');
    onValue(friendRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item)=>{
        if(data.uid == item.val().whoreceiveid || data.uid == item.val().whosendid){
          arr.push({...item.val(), id:item.key})
        }
    })
    setfriendList(arr);
  });
  },[])



  let handleUser = (i)=> {
    console.log(i);
  }


  return (
    <div className='msg_wrapper'>
      <div className='message_user'>
        <h3 className='list_heading'>Friend list</h3>
        <div className='msg_user_wrapper'>
        {friendList && friendList.length>0
       ?
       friendList.map((item, index)=>(
     <div onClick={()=>handleUser(item)} key={index} className='msg_user_item'>
     <div className="user_img">
       <Image src={data.uid == item.whosendid ? item.whoreceivephoto :item.whosendphoto} alt='Not Found'/>
     </div>
     <div className='user_info'>
       <div className='user_detils'>
         {
           data.uid == item.whosendid
           ?
           <h5>{item.whoreceivename}</h5>
           :
           <h5>{item.whosendname}</h5>
         }
         <p>MERN Developer</p>
       </div>
       {/* <div className='user_Accept'>
           <button> Massage</button>
       </div> */}
     </div>
   </div>
 ))
 :
 <h2>No friend found.....</h2>
}
        </div>
      </div>
      <div className='msg_box'>
        <div className='msg_box_heading'>
        <h3 >Jakaria</h3>
        <h6 >Active Now</h6>
        </div>
        <div className='msg_main'>
          <div className='sendmsg'>
            <p>
              hellow
            </p>
          </div>
          <div className='receivemsg'>
            <p>
              hi
            </p>
          </div>
          <div className='sendmsg'>
            <p>
              kmn aso
            </p>
          </div>
          <div className='receivemsg'>
            <p>
              valo asi
            </p>
          </div>
        </div>
        <div className='msg_footer'>
        <input type="text"  placeholder='enter your message'/>
          </div>
      </div>
    </div>
  )
}

export default Message