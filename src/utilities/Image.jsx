import React from 'react'

const Image = ({style ,src, alt}) => {
  return (
    <picture>
        <img className={style} src={src} alt={alt} />
    </picture>
  )
}

export default Image