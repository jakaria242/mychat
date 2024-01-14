import { TextField } from '@mui/material'
import React from 'react'

const Input = ({style, type, name, label, placeholder, variant}) => {
  return (
    <TextField className={style} type={type} name={name} id="standard-basic" label={label} placeholder={placeholder} variant={variant} />
  )
}

export default Input