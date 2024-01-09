import React from 'react'

const Img = ({sorce,alt}) => {
  return (
    <>
    <picture>
    <img src={sorce} alt={alt} />
    </picture>
    </>
  )
}

export default Img