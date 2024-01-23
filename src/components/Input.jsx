import { TextField } from '@mui/material'
import React from 'react'

const Input = ({style, type, name, label, placeholder, variant,onChange,value}) => {
  return (
    <TextField onChange={onChange} value={value} className={style} type={type} name={name} label={label} placeholder={placeholder} variant={variant} />
  )
}

export default Input