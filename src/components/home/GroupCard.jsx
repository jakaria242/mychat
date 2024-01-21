import React from 'react'
import '../home/groupcard.css'
import { BsThreeDotsVertical } from "react-icons/bs";




const GroupCard = ({children,cardtitle}) => {
  return (
    <div className='groupcard'>
        <div className='group_heading'>
                <h4>{cardtitle}</h4>
            <div className='three_dots'>
                <BsThreeDotsVertical />
            </div>
        </div>
           {children}
    </div>
  )
}

export default GroupCard