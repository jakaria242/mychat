import React, { useEffect, useState } from 'react'
import GroupCard from '../../components/home/GroupCard'
import Image from '../../utilities/Image'
import Ellipse from '../../assets/images/Ellipse 2.png'
import { getDatabase, ref, onValue , set, push, remove } from "firebase/database";
import { useSelector, useDispatch } from 'react-redux';
import { Circles } from 'react-loader-spinner';

const BlockList = () => {


  const [blockList, setblockList] = useState([])

  const data = useSelector((state) =>state.loginuserdata.value)

  const db = getDatabase();

  useEffect(()=>{
    const blockRef = ref(db, 'block');
    onValue(blockRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item)=>{
        if(item.val().whoblockid == data.uid){
          arr.push({...item.val(), id:item.key})
        }
    })
    setblockList(arr);
  });
  },[])



  
  //unblock oparetion 

   let handleUserUnblock = (unblockInfo) => {
    remove(ref(db, "block/" + unblockInfo.id)).then(() => {
      toast.success("Unblock User Successfull", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    });
   }


  return (
    <GroupCard cardtitle="Block List">
    <div className='user_box'>
       {blockList && blockList.length>0
       ?
       blockList.map((item, index)=>(
            <div key={index} className='user_item'>
            <div className="user_img">
              <Image src={item.blockimg} alt='Not Found'/>
            </div>
            <div className='user_info'>
              <div className='user_detils'>
                  <h5>{item.blockname}</h5>
                <p>MERN Developer</p>
              </div>
              <div className='user_Accept'>
                  <button onClick={() => handleUserUnblock(item)}>Unblock</button>
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
  )
}

export default BlockList