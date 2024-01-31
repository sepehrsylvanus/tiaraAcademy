import { LinearProgress, linearProgressClasses, styled } from "@mui/material";

export const CustomLinearProgress = styled(LinearProgress)(() => ({
  height: 10,

  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#d7d7d7',
  },
  [`& .${linearProgressClasses.bar}`]: {
    
    backgroundColor: '#f0f0f0',
  },
}));