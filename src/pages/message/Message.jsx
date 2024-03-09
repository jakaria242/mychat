import React, { useEffect, useState } from 'react'
import { getDatabase, ref, onValue , set, push, remove } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux';
import "./massage.css"
import Image from '../../utilities/Image';
import { activeuser } from '../../slices/activeUserSlice';
import { IoMdSend } from "react-icons/io";


const Message = () => {

  const [allMessage, setAllMessage] = useState([])
  const [msgText, setMsgText] = useState(" ")
  const [friendList, setfriendList] = useState([])
  const data = useSelector((state) =>state.loginuserdata.value)
  const activechat = useSelector((state) =>state?.activeuserdata?.value)



  const db = getDatabase();

  const dispatch = useDispatch();


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
    dispatch(activeuser(i))
  }


    let handleSubmit = () => {
      // console.log(msgText);
      set(push(ref(db, 'message')),{
        senderid : data.uid,
        senderemail : data.email,
        sendername : data.displayName,
        message : msgText,
        receiverid: data.uid == activechat.whoreceiveid ? activechat.whosendid : activechat.whoreceiveid,
        receivername : data.uid == activechat.whoreceiveid ? activechat.whosendname : activechat.whoreceivename,
        receiveremail : data.uid == activechat.whoreceiveid ? activechat.whosendemail : activechat.whoreceiveemail,

      }).then(()=>{
        console.log("hoise");
      })
    }

    // message read oparetion


    useEffect(()=>{
      const messageRef = ref(db, 'message');
      onValue(messageRef, (snapshot) => {
        let arr = []
        snapshot.forEach((item)=>{
          if(data.uid == item.val().receiverid || data.uid == item.val().senderid
          ){
            arr.push({...item.val(), id:item.key})
          }
      })
      setAllMessage(arr);
    });
    },[activechat])
  


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
      {
        activechat != null 
        ?
        <div className='msg_box'>
        <div className='msg_box_heading'>
        <h3 >
          {activechat !== null && 
          activechat.whosendid == data.uid
          ?
          activechat.whoreceivename
          :
          activechat.whosendname
          }
        </h3>
        <h6 className='peraactive'>Active Now</h6>
        </div>
        <div className='msg_main'>
          {
            allMessage.map((item,index)=>(
          <div key={index} className='sendmsg'>
            <p>
              {item.message}
            </p>
          </div>
            ))
          }
          {/* <div className='receivemsg'>
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
          </div> */}
        </div>
        <div className='msg_footer'>
        <input onChange={(e)=>setMsgText(e.target.value)} type="text"  placeholder='Enter your message' className='msg_input'/>
        <div onClick={handleSubmit} className='msg_send'>
        <IoMdSend />
        </div>
          </div>
      </div>
        :
        <div>
          <h1>Plese select a user</h1>
        </div>
      }
    </div>
  )
}

export default Message