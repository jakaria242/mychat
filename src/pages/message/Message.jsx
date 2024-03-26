import React, { useEffect, useState, useRef } from 'react'
import { getDatabase, ref, onValue , set, push, remove } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux';
import "./massage.css"
import Image from '../../utilities/Image';
import { activeuser } from '../../slices/activeUserSlice';
import { IoMdSend } from "react-icons/io";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import EmojiPicker from 'emoji-picker-react';
import { MdEmojiEmotions } from "react-icons/md";
import ScrollToBottom from 'react-scroll-to-bottom';


const Message = () => {

  const [allMessage, setAllMessage] = useState([])
  const [showEmoji, setShowEmoji] = useState(false)
  const [msgText, setMsgText] = useState("")
  const [friendList, setfriendList] = useState()
  const db = getDatabase();
  const data = useSelector((state) =>state.loginuserdata.value)
  const activechat = useSelector((state) =>state?.activeuserdata?.value)
  const dispatch = useDispatch();

  const emojiRef = useRef()

  // console.log(activechat);


  //friend read operation

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


      //msg write operation
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
        setMsgText("")
      })
    }


    // message read oparetion
    // console.log(activechat.whosendid);             ////problem
    
    useEffect(()=>{
      const messageRef = ref(db, 'message');
      onValue(messageRef, (snapshot) => {
        let arr = []
        let activeuserid = activechat.whosendid == data.uid ? activechat.whoreceiveid : activechat.whosendid;
        // console.log(activeuserid);
        snapshot.forEach((item)=>{
          if((item.val().senderid == data.uid && item.val().receiverid == activeuserid) || (item.val().receiverid == data.uid && item.val().senderid == activeuserid)){
            arr.push({...item.val(), id:item.key})
          }
      })
      setAllMessage(arr);
    });
    },[activechat])


    let handleKeyPress = (e) => {
     if (e.key == "Enter") {
      set(push(ref(db, 'message')),{
        senderid : data.uid,
        senderemail : data.email,
        sendername : data.displayName,
        message : msgText,
        receiverid: data.uid == activechat.whoreceiveid ? activechat.whosendid : activechat.whoreceiveid,
        receivername : data.uid == activechat.whoreceiveid ? activechat.whosendname : activechat.whoreceivename,
        receiveremail : data.uid == activechat.whoreceiveid ? activechat.whosendemail : activechat.whoreceiveemail,

      }).then(()=>{
        setMsgText("")
      })
     }
    }


    let handleEmojiPick = (e) => {
      setMsgText(msgText + e.emoji)
    }



    useEffect(()=>{
      document.body.addEventListener("click",(e)=>{
  
        // console.log(e.target);
        // console.log(emojiRef.current.contains(e.target));
        if(emojiRef.current.contains(e.target)){
          setShowEmoji(true)
        }else{
          setShowEmoji(false)
        }
      })
    },[])
  


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
        <ScrollToBottom className="scroll_box">
        <div className='msg_main'>
          {
            allMessage.map((item,index)=>(
          <div key={index} className={`${item.receiverid == data.uid ? "receivemsg" : "sendmsg"}`}>
            <p>
              {item.message}
            </p>
          </div>
            ))
          }
        </div>
        </ScrollToBottom>
        <div className='msg_footer'>
        <input onKeyUp={handleKeyPress} onChange={(e)=>setMsgText(e.target.value)} value={msgText}  type="text"  placeholder='Enter your message' className='msg_input'/>
        {
          msgText.length > 0 && 
          <div onClick={handleSubmit} className='msg_send'><IoMdSend /></div> 
        }
        <div ref={emojiRef}> 
        {
           showEmoji ?
           <div onClick={()=>setShowEmoji(!showEmoji)} className='emoji'><MdOutlineEmojiEmotions /></div>
           :
           <div onClick={()=>setShowEmoji(false)} className='emoji'><MdEmojiEmotions />
           </div>
        }
        {
          showEmoji && 
          <div  className='emojiwrapper'><EmojiPicker onEmojiClick={handleEmojiPick}/></div>
        }
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