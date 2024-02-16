'use client'
import { Select, TextField, styled } from "@mui/material";

 export const CustomClassTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: '#A0AAB4',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#B2BAC2',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: '2px solid black',
        borderRadius: 0
      },
      
      '&.Mui-focused fieldset': {
        borderColor: '#6F7E8C',
      },
      
    },
  });
  

 