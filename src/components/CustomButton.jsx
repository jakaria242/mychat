import { Button } from '@mui/material'
import React from 'react'

const CustomButton = ({styling, variant, text}) => {
  return (
    <Button className={styling} variant={variant}>{text}</Button>
  )
}

export default CustomButton