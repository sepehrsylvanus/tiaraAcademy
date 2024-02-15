'use client'
import { Instructure } from '@/utils/types'
import { Autocomplete, TextField } from '@mui/material'
import React from 'react'
import useSWR from 'swr'

const CustomAutoComplete = () => {
    const {data, error} = useSWR<Instructure[], Error>('/api/teachers', (url:string) => fetch(url).then(r => r.json()))
    // const teachersName = data?.map(instructure => instructure.name)
    console.log(data)

    const teachersName = data ? data.map(teacher => teacher.name ) : []
  return (
    <div>
      {teachersName && (
        <Autocomplete
          id="combo-box-demo"
          options={teachersName}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="teachers" />}
        />
      )}
    </div>
  );
}

export default CustomAutoComplete