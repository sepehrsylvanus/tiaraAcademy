'use client'
import React from 'react'
import styles from './customSelect.module.css'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
const CustomSelect = ({times}: {times:string[]}) => {
  return (
    <FormControl sx={{width: 200, marginTop: '1em'}}>
    <InputLabel id="customSelectLabel">زمان کلاس را انتخاب کنید</InputLabel>
    <Select
      labelId="customSelectLabel"

      // value={age}
      label="زمان کلاس را انتخاب کنید"
      // onChange={handleChange}
    >
      {times.map(item=> (
         <MenuItem key={item} value={item}>{item}</MenuItem>
      ))}
    </Select>
  </FormControl>
  )
}

export default CustomSelect