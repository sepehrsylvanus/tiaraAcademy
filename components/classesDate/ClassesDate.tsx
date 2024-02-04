'use state'
import React, { useState } from 'react'
import styles from './classesDate.module.css'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField, TextFieldProps } from '@mui/material';
const ClassesDate = () => {
  const [value, setValue] = useState<Date | null>(null)

// ALREADY SCHEDULED
const bookedDates : Date[] = [new Date(2024, 4, 5), new Date(2024, 4, 15), new Date(2024, 4, 20)];

const handleDateChange = (dateValue: Date | null)=>{
  setValue(dateValue)
}

const reserveClass = () =>{
  'use server'
}
  
  return (
    <div className={styles.container}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
<DatePicker
  label="Class date"
  value={value}
  onChange={handleDateChange}
 
  // Disable the dates when classes are already scheduled
  shouldDisableDate={(date) => bookedDates.some((d) => d.getTime() === date.getTime())}
/>
      </LocalizationProvider>
    </div>
  )
}

export default ClassesDate