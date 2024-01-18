import { Button } from '@mui/material'
import React from 'react'

const CustomButton = ({styling, variant, text,onClick}) => {
  return (
    <Button onClick={onClick} className={styling} variant={variant}>{text}</Button>
  )
}

export default CustomButton